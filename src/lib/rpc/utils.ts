import { Session, SupabaseClient } from "@supabase/supabase-js";

export interface Auth {
  user_id: string;
  role: string;
}

export type ServerParams<T> = {
  params: T;
  supabase: SupabaseClient;
  auth: Auth;
};

export async function getUserProfileAuth(
  supabase: SupabaseClient,
  userID: string
): Promise<Auth | Error> {
  const { data, error } = await supabase
    .from("user")
    .select("id, role")
    .eq("github_user_id", userID)
    .single();

  if (error) {
    return new Error(`DB query failed: ${error.message}`);
  }

  return {
    // @ts-ignore
    user_id: data.id,
    // @ts-ignore
    role: data.role,
  };
}
