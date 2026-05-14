"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const website = String(formData.get("website") || "");

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, website })
    });

    if (response.ok) {
      setStatus("success");
      setMessage("שלחנו אליך מייל לאימות. צריך ללחוץ על הקישור כדי להתחיל לקבל את הציטוט היומי.");
      setEmail("");
      return;
    }

    setStatus("error");
    setMessage("משהו לא עבד. כדאי לבדוק את כתובת המייל ולנסות שוב.");
  }

  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <label htmlFor="email">לאן לשלוח את הציטוט היומי?</label>
      <div className="input-row">
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "שולחים..." : "הצטרפו בחינם"}
        </button>
      </div>
      <input className="website-field" name="website" tabIndex={-1} autoComplete="off" />
      <p className="form-note">מייל אחד ביום. אפשר להסיר בכל רגע.</p>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
