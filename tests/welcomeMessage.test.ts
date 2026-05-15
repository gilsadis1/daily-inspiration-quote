import { describe, expect, it, vi } from "vitest";
import { buildWelcomeMessage, WELCOME_QUOTE_ID } from "../src/core/welcomeMessage";

describe("welcome message", () => {
  it("uses a static quote that is not part of the landing page examples", () => {
    vi.stubEnv("PUBLIC_BASE_URL", "https://example.com");

    const message = buildWelcomeMessage("unsubscribe-token");

    expect(WELCOME_QUOTE_ID).toBe("katherine-johnson-welcome");
    expect(message).toContain("קתרין ג׳ונסון");
    expect(message).toContain("https://example.com/unsubscribe?token=unsubscribe-token");
    expect(message).not.toContain("מייקל ג'ורדן");
    expect(message).not.toContain("סרינה ויליאמס");
  });
});
