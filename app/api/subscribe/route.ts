import { NextResponse } from "next/server";
import { createSignup } from "../../../src/services/subscribers";
import { sendEmailMessage } from "../../../src/services/email";

function baseUrl(): string {
  return (process.env.PUBLIC_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; website?: string };
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    if (!body.email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const signup = await createSignup(body.email);
    if (signup.verificationToken) {
      const verifyUrl = `${baseUrl()}/verify?token=${encodeURIComponent(signup.verificationToken)}`;
      await sendEmailMessage(
        "אימות הרשמה לציטוט היומי",
        [
          "כמעט סיימנו.",
          "",
          "כדי להתחיל לקבל את הציטוט היומי, צריך לאשר את כתובת המייל:",
          verifyUrl,
          "",
          "אם לא ביקשת להירשם, אפשר להתעלם מהמייל הזה."
        ].join("\n"),
        { to: signup.email }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Signup failed:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
