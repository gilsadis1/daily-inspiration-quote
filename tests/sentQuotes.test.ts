import { describe, expect, it, vi } from "vitest";

const chain = {
  from: vi.fn(),
  select: vi.fn(),
  order: vi.fn(),
  returns: vi.fn(),
  upsert: vi.fn()
};

vi.mock("../src/services/supabase", () => ({
  getSupabaseAdmin: () => chain
}));

describe("sent quote storage", () => {
  it("maps Supabase rows to selector sent entries", async () => {
    chain.from.mockReturnValue(chain);
    chain.select.mockReturnValue(chain);
    chain.order.mockReturnValue(chain);
    chain.returns.mockResolvedValue({
      data: [{ sent_date: "2026-05-14", quote_id: "q1" }],
      error: null
    });

    const { readSentQuotes } = await import("../src/services/sentQuotes");
    await expect(readSentQuotes()).resolves.toEqual([
      { date: "2026-05-14", quoteId: "q1" }
    ]);
  });

  it("upserts sent quote entries by date and quote id", async () => {
    chain.from.mockReturnValue(chain);
    chain.upsert.mockResolvedValue({ error: null });

    const { appendSentQuote } = await import("../src/services/sentQuotes");
    await appendSentQuote({ date: "2026-05-14", quoteId: "q2" });

    expect(chain.from).toHaveBeenCalledWith("sent_quotes");
    expect(chain.upsert).toHaveBeenCalledWith(
      { sent_date: "2026-05-14", quote_id: "q2" },
      { onConflict: "sent_date,quote_id" }
    );
  });
});
