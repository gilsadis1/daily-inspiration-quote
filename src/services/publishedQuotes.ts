import { getSupabaseAdmin } from "./supabase";

export type PublishedQuoteInput = {
  sentDate: string;
  quoteId: string;
  author: string;
  quoteText: string;
  bioLines: string[];
  wikipediaUrl: string;
  reflectionQuestion?: string;
};

export async function upsertPublishedQuote(input: PublishedQuoteInput): Promise<void> {
  const supabase = getSupabaseAdmin();
  const result = await supabase
    .from("published_quotes")
    .upsert(
      {
        sent_date: input.sentDate,
        quote_id: input.quoteId,
        author: input.author,
        quote_text: input.quoteText,
        bio_lines: input.bioLines,
        wikipedia_url: input.wikipediaUrl,
        reflection_question: input.reflectionQuestion || null
      },
      { onConflict: "sent_date,quote_id" }
    );

  if (result.error) {
    throw result.error;
  }
}
