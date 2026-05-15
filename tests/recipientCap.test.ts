import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assertWithinDailyRecipientCap,
  DEFAULT_MAX_DAILY_EMAIL_RECIPIENTS,
  getMaxDailyEmailRecipients
} from "../src/core/recipientCap";

describe("recipient cap", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("defaults to a conservative Gmail safety cap", () => {
    vi.stubEnv("MAX_DAILY_EMAIL_RECIPIENTS", "");
    expect(getMaxDailyEmailRecipients()).toBe(DEFAULT_MAX_DAILY_EMAIL_RECIPIENTS);
  });

  it("allows valid custom caps", () => {
    vi.stubEnv("MAX_DAILY_EMAIL_RECIPIENTS", "42");
    expect(getMaxDailyEmailRecipients()).toBe(42);
  });

  it("rejects invalid caps", () => {
    vi.stubEnv("MAX_DAILY_EMAIL_RECIPIENTS", "0");
    expect(() => getMaxDailyEmailRecipients()).toThrow("MAX_DAILY_EMAIL_RECIPIENTS");
  });

  it("fails before sending when the cap is exceeded", () => {
    expect(() => assertWithinDailyRecipientCap(101, 100)).toThrow(
      "Subscriber count exceeded Gmail safety cap"
    );
  });
});
