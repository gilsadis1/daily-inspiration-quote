import type { SentEntry } from "../core/storage";
import { getSupabaseAdmin } from "./supabase";

type SentQuoteRow = {
  sent_date: string;
  quote_id: string;
};

export async function readSentQuotes(): Promise<SentEntry[]> {
  const supabase = getSupabaseAdmin();
  const result = await supabase
    .from("sent_quotes")
    .select("sent_date,quote_id")
    .order("sent_date", { ascending: true })
    .returns<SentQuoteRow[]>();

  if (result.error) {
    throw result.error;
  }

  return (result.data || []).map((row) => ({
    date: row.sent_date,
    quoteId: row.quote_id
  }));
}

export async function appendSentQuote(entry: SentEntry): Promise<void> {
  const supabase = getSupabaseAdmin();
  const result = await supabase
    .from("sent_quotes")
    .upsert(
      {
        sent_date: entry.date,
        quote_id: entry.quoteId
      },
      { onConflict: "sent_date,quote_id" }
    );

  if (result.error) {
    throw result.error;
  }
}
