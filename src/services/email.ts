import nodemailer from "nodemailer";

type EmailProvider = "smtp" | "brevo";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function parsePort(value: string | undefined): number {
  return Number(value || "587");
}

function parseBool(value: string | undefined, fallback: boolean): boolean {
  if (!value) return fallback;
  return ["1", "true", "yes", "y"].includes(value.toLowerCase());
}

function getEmailProvider(): EmailProvider {
  const provider = (process.env.EMAIL_PROVIDER || "smtp").trim().toLowerCase();
  if (provider !== "smtp" && provider !== "brevo") {
    throw new Error("EMAIL_PROVIDER must be either smtp or brevo");
  }
  return provider;
}

function toHtml(text: string): string {
  const lines = text.split("\n");
  const htmlLines: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const nextLine = lines[index + 1] || "";

    if (line.includes("להסרה מהמייל היומי") && /^https?:\/\/\S+/.test(nextLine.trim())) {
      htmlLines.push(
        `${escapeHtml(line)} <a href="${escapeAttribute(nextLine.trim())}" style="color:#1f6f50;font-weight:700;text-decoration:underline;">לחצו כאן</a>`
      );
      index += 1;
      continue;
    }

    htmlLines.push(linkifyLine(line));
  }

  const htmlBody = htmlLines.join("<br>");

  return [
    "<!doctype html>",
    '<html lang="he" dir="rtl">',
    '<head><meta charset="utf-8"></head>',
    '<body dir="rtl" style="margin:0; direction:rtl; text-align:right;">',
    '<div dir="rtl" style="direction:rtl; text-align:right; unicode-bidi:plaintext; font-family: Arial, sans-serif; line-height:1.7;">',
    htmlBody,
    "</div>",
    "</body>",
    "</html>"
  ].join("");
}

function stripBoldMarkers(text: string): string {
  return text.replace(/\*\*([^*\n]+)\*\*/g, "$1");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(text: string): string {
  return escapeHtml(text).replace(/"/g, "&quot;");
}

function linkifyLine(line: string): string {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return renderBold(escapeHtml(line)).replace(urlPattern, (url) => {
    const href = escapeAttribute(url);
    return `<a href="${href}" style="color:#1f6f50;font-weight:700;text-decoration:underline;">${url}</a>`;
  });
}

function renderBold(line: string): string {
  return line.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
}

function senderName(): string {
  return (process.env.EMAIL_FROM_NAME || "Daily Quote Bot").trim();
}

function senderEmail(fallback?: string): string {
  const from = (process.env.EMAIL_FROM || "").trim() || fallback;
  if (!from) {
    throw new Error("Missing environment variable: EMAIL_FROM");
  }
  return from;
}

function recipientEmail(to?: string): string {
  return to || getEnv("EMAIL_TO");
}

function replyToEmail(): string | undefined {
  return (process.env.EMAIL_REPLY_TO || "").trim() || undefined;
}

function isTransientSmtpError(err: unknown): boolean {
  const code = String((err as { code?: string })?.code || "");
  return ["ECONNECTION", "ETIMEDOUT", "ESOCKET", "ECONNRESET"].includes(code);
}

function isTransientBrevoError(status: number): boolean {
  return status === 429 || status >= 500;
}

async function sendSmtpEmail(
  subject: string,
  text: string,
  options: { to?: string } = {}
): Promise<void> {
  const host = getEnv("SMTP_HOST");
  const port = parsePort(process.env.SMTP_PORT);
  const secure = parseBool(process.env.SMTP_SECURE, port === 465);
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  const from = senderEmail(user);
  const to = recipientEmail(options.to);
  const fromName = senderName();
  const replyTo = replyToEmail();
  const textContent = stripBoldMarkers(text);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });

  let lastError: unknown;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const info = await transporter.sendMail({
        from: `${fromName} <${from}>`,
        to,
        replyTo,
        subject,
        text: textContent,
        html: toHtml(text)
      });
      console.log(`Email queued: ${info.messageId}`);
      return;
    } catch (err: unknown) {
      lastError = err;
      const code = (err as { code?: string })?.code;
      const message = (err as { message?: string })?.message || "Unknown SMTP error";
      console.error(`Email send attempt ${attempt} failed: code=${String(code)} message=${message}`);
      if (attempt >= 2 || !isTransientSmtpError(err)) {
        break;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("SMTP email send failed");
}

async function sendBrevoEmail(
  subject: string,
  text: string,
  options: { to?: string } = {}
): Promise<void> {
  const apiKey = getEnv("BREVO_API_KEY");
  const from = senderEmail();
  const to = recipientEmail(options.to);
  const fromName = senderName();
  const replyTo = replyToEmail();
  const textContent = stripBoldMarkers(text);

  const body = {
    sender: { email: from, name: fromName },
    to: [{ email: to }],
    ...(replyTo ? { replyTo: { email: replyTo } } : {}),
    subject,
    textContent,
    htmlContent: toHtml(text)
  };

  let lastError: unknown;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": apiKey
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Brevo error ${response.status}: ${responseBody}`);
      }

      const responseBody = await response.json().catch(() => ({}));
      const messageId = (responseBody as { messageId?: string }).messageId || "unknown";
      console.log(`Email queued via Brevo: ${messageId}`);
      return;
    } catch (err: unknown) {
      lastError = err;
      const message = (err as { message?: string })?.message || "Unknown Brevo error";
      const statusMatch = message.match(/Brevo error (\d+)/);
      const status = statusMatch ? Number(statusMatch[1]) : 0;
      console.error(`Brevo send attempt ${attempt} failed: ${message}`);
      if (attempt >= 2 || !isTransientBrevoError(status)) {
        break;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Brevo email send failed");
}

export async function sendEmailMessage(
  subject: string,
  text: string,
  options: { to?: string } = {}
): Promise<void> {
  const provider = getEmailProvider();
  if (provider === "brevo") {
    await sendBrevoEmail(subject, text, options);
    return;
  }

  await sendSmtpEmail(subject, text, options);
}
