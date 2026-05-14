import { describe, expect, it } from "vitest";
import { QUOTES } from "../src/quotes/quotes";

describe("quote dataset", () => {
  it("has enough quotes to avoid repeats for at least 90 days", () => {
    expect(QUOTES.length).toBeGreaterThanOrEqual(90);
  });

  it("uses unique quote ids", () => {
    const ids = QUOTES.map((quote) => quote.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
