export const DEFAULT_MAX_DAILY_EMAIL_RECIPIENTS = 100;

export function getMaxDailyEmailRecipients(): number {
  const raw = (process.env.MAX_DAILY_EMAIL_RECIPIENTS || "").trim();
  if (!raw) {
    return DEFAULT_MAX_DAILY_EMAIL_RECIPIENTS;
  }

  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error("MAX_DAILY_EMAIL_RECIPIENTS must be a positive integer");
  }

  return value;
}

export function assertWithinDailyRecipientCap(recipientCount: number, maxRecipients: number): void {
  if (recipientCount > maxRecipients) {
    throw new Error(
      `Subscriber count exceeded Gmail safety cap: ${recipientCount} recipients pending, cap is ${maxRecipients}. ` +
        "Stop sending from personal Gmail and move to a production email provider."
    );
  }
}
