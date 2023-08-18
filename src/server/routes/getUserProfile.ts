import { isAdmin, ServerParams } from "..";
import { UserProfile } from "../..";

type Params = {
  user_id: string;
} | null;

export async function getUserProfile({ supabase, params, auth }: ServerParams<Params>): Promise<UserProfile | Error> {
  const user_id = params ? params.user_id : auth.user_id;

  if (user_id != auth.user_id && !isAdmin(auth)) {
    return new Error("Not authorized");
  }

  const { data, error } = await supabase.from("user").select().eq("id", user_id).single();

  if (error) {
    console.error(error);
    return new Error(`ERROR -- getUserProfile failed. user_id: ${user_id}, message: ${error.message}`);
  }

  return data as any;
}
