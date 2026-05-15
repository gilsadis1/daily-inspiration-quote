import { describe, expect, it, vi } from "vitest";

const chain = {
  from: vi.fn(),
  select: vi.fn(),
  eq: vi.fn(),
  limit: vi.fn(),
  upsert: vi.fn()
};

vi.mock("../src/services/supabase", () => ({
  getSupabaseAdmin: () => chain
}));

describe("subscriber delivery storage", () => {
  it("detects when a subscriber already received a quote on a date", async () => {
    chain.from.mockReturnValue(chain);
    chain.select.mockReturnValue(chain);
    chain.eq.mockReturnValue(chain);
    chain.limit.mockResolvedValue({ data: [{ id: "delivery-1" }], error: null });

    const { hasSubscriberDeliveryForDate } = await import("../src/services/subscriberDeliveries");
    await expect(hasSubscriberDeliveryForDate("subscriber-1", "2026-05-14")).resolves.toBe(true);
  });

  it("records one delivery per subscriber per date", async () => {
    chain.from.mockReturnValue(chain);
    chain.upsert.mockResolvedValue({ error: null });

    const { recordSubscriberDelivery } = await import("../src/services/subscriberDeliveries");
    await recordSubscriberDelivery({
      subscriberId: "subscriber-1",
      quoteId: "quote-1",
      sentDate: "2026-05-14",
      deliveryType: "welcome"
    });

    expect(chain.from).toHaveBeenCalledWith("subscriber_deliveries");
    expect(chain.upsert).toHaveBeenCalledWith(
      {
        subscriber_id: "subscriber-1",
        quote_id: "quote-1",
        sent_date: "2026-05-14",
        delivery_type: "welcome"
      },
      { onConflict: "subscriber_id,sent_date" }
    );
  });
});
