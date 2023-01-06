import { createClient } from "@supabase/supabase-js";

// TODO: error checking when loading env?
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
