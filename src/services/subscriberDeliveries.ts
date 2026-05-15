import { getSupabaseAdmin } from "./supabase";

export type DeliveryType = "welcome" | "daily";

export type SubscriberDelivery = {
  subscriberId: string;
  quoteId: string;
  sentDate: string;
  deliveryType: DeliveryType;
};

export function todayDateString(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export async function hasSubscriberDeliveryForDate(
  subscriberId: string,
  sentDate: string
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const result = await supabase
    .from("subscriber_deliveries")
    .select("id")
    .eq("subscriber_id", subscriberId)
    .eq("sent_date", sentDate)
    .limit(1);

  if (result.error) {
    throw result.error;
  }

  return (result.data || []).length > 0;
}

export async function recordSubscriberDelivery(delivery: SubscriberDelivery): Promise<void> {
  const supabase = getSupabaseAdmin();
  const result = await supabase
    .from("subscriber_deliveries")
    .upsert(
      {
        subscriber_id: delivery.subscriberId,
        quote_id: delivery.quoteId,
        sent_date: delivery.sentDate,
        delivery_type: delivery.deliveryType
      },
      { onConflict: "subscriber_id,sent_date" }
    );

  if (result.error) {
    throw result.error;
  }
}
