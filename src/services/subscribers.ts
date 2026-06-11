import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { getSupabaseAdmin } from "./supabase";

export type SubscriberStatus = "pending" | "active" | "unsubscribed";

export type Subscriber = {
  id: string;
  email: string;
  status: SubscriberStatus;
};

export type VerificationResult = {
  verified: boolean;
  subscriber?: {
    id: string;
    email: string;
  };
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createToken(): string {
  return randomBytes(32).toString("base64url");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function signingSecret(): string {
  return getEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function createUnsubscribeToken(subscriberId: string): string {
  const signature = createHmac("sha256", signingSecret()).update(subscriberId).digest("base64url");
  return `${subscriberId}.${signature}`;
}

function parseUnsubscribeToken(token: string): string | null {
  const [subscriberId, signature] = token.split(".");
  if (!subscriberId || !signature) return null;

  const expected = createHmac("sha256", signingSecret()).update(subscriberId).digest("base64url");
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return null;
  return timingSafeEqual(actualBuffer, expectedBuffer) ? subscriberId : null;
}

export async function createSignup(emailInput: string): Promise<{
  email: string;
  verificationToken: string | null;
}> {
  const email = normalizeEmail(emailInput);
  if (!isValidEmail(email)) {
    throw new Error("Invalid email address");
  }

  const supabase = getSupabaseAdmin();

  const existing = await supabase
    .from("subscribers")
    .select("id,email,status")
    .eq("email", email)
    .maybeSingle<Subscriber>();

  if (existing.error) {
    throw existing.error;
  }

  let subscriberId = existing.data?.id;
  if (existing.data?.status === "active") {
    return { email, verificationToken: null };
  }

  if (subscriberId) {
    const updated = await supabase
      .from("subscribers")
      .update({
        status: "pending",
        unsubscribed_at: null,
        updated_at: new Date().toISOString()
      })
      .eq("id", subscriberId)
      .select("id")
      .single<{ id: string }>();

    if (updated.error) {
      throw updated.error;
    }
  } else {
    const inserted = await supabase
      .from("subscribers")
      .insert({
        email,
        status: "pending",
        source: "daily-inspiration-quote"
      })
      .select("id")
      .single<{ id: string }>();

    if (inserted.error) {
      throw inserted.error;
    }
    subscriberId = inserted.data.id;
  }

  const verificationToken = createToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
  const tokenResult = await supabase.from("verification_tokens").insert({
    subscriber_id: subscriberId,
    token_hash: hashToken(verificationToken),
    expires_at: expiresAt
  });

  if (tokenResult.error) {
    throw tokenResult.error;
  }

  return { email, verificationToken };
}

export async function verifySubscriber(token: string): Promise<VerificationResult> {
  const supabase = getSupabaseAdmin();
  const tokenHash = hashToken(token);
  const now = new Date().toISOString();

  const tokenResult = await supabase
    .from("verification_tokens")
    .select("id,subscriber_id,expires_at,used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle<{ id: string; subscriber_id: string; expires_at: string; used_at: string | null }>();

  if (tokenResult.error) {
    throw tokenResult.error;
  }
  if (!tokenResult.data || tokenResult.data.used_at || tokenResult.data.expires_at < now) {
    return { verified: false };
  }

  const subscriberUpdate = await supabase
    .from("subscribers")
    .update({
      status: "active",
      verified_at: now,
      updated_at: now
    })
    .eq("id", tokenResult.data.subscriber_id)
    .select("id,email,status")
    .single<Subscriber>();

  if (subscriberUpdate.error) {
    throw subscriberUpdate.error;
  }

  const tokenUpdate = await supabase
    .from("verification_tokens")
    .update({ used_at: now })
    .eq("id", tokenResult.data.id);

  if (tokenUpdate.error) {
    throw tokenUpdate.error;
  }

  return {
    verified: true,
    subscriber: {
      id: subscriberUpdate.data.id,
      email: subscriberUpdate.data.email
    }
  };
}

export async function unsubscribeByToken(token: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const subscriberId = parseUnsubscribeToken(token);
  if (!subscriberId) return false;

  const now = new Date().toISOString();
  const result = await supabase
    .from("subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: now,
      updated_at: now
    })
    .eq("id", subscriberId)
    .neq("status", "unsubscribed");

  if (result.error) {
    throw result.error;
  }

  return true;
}

export async function listActiveSubscribers(): Promise<Array<{ id: string; email: string; unsubscribeToken: string }>> {
  return listSubscribersByStatuses(["active"]);
}

export async function listSubscribersByStatuses(
  statuses: SubscriberStatus[]
): Promise<Array<{ id: string; email: string; unsubscribeToken: string }>> {
  const supabase = getSupabaseAdmin();
  const result = await supabase
    .from("subscribers")
    .select("id,email")
    .in("status", statuses);

  if (result.error) {
    throw result.error;
  }

  return (result.data || [])
    .map((row) => ({
      id: row.id,
      email: row.email,
      unsubscribeToken: createUnsubscribeToken(row.id)
    }));
}
