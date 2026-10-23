
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function getSupabaseClient(): any {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variables."
    );
  }

  return createClient(supabaseUrl, supabasePublishableKey);
}

export const supabase: any = new Proxy({} as any, {
  get(_target, property) {
    const client = getSupabaseClient();
    const value = Reflect.get(client, property, client);

    return typeof value === "function"
      ? value.bind(client)
      : value;
  },
});
