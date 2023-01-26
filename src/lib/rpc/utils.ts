import { Session, SupabaseClient } from "@supabase/supabase-js";

export interface Auth {
  user_id: string;
  role: string;
}

export function isAdmin(auth: Auth): boolean {
  return auth.role == "admin";
}

export type ServerParams<T> = {
  params: T;
  supabase: SupabaseClient;
  auth: Auth;
};

export async function getUserProfileAuth(supabase: SupabaseClient, userID: string): Promise<Auth | Error> {
  const { data, error } = await supabase.from("user").select("id, role").eq("github_user_id", userID).single();

  if (error) {
    return new Error(`DB query failed: ${error.message}`);
  }

  return {
    user_id: data.id,
    role: data.role,
  };
}

export async function getIsUserEvaluator(
  supabase: SupabaseClient,
  userID: string,
  evaluatorID: string,
): Promise<any | Error> {
  const { data, error } = await supabase.rpc("is_user_evaluator", {
    in_user_id: userID,
    in_evaluator_id: evaluatorID,
  });

  if (error) {
    return new Error(`DB query failed: ${error.message}`);
  }

  return data;
}
