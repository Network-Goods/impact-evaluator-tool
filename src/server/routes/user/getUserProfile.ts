import { userProcedure } from "src/server/trpc";
import { isAdmin } from "src/lib/rpc";

export const getUserProfile = userProcedure.query(async ({ ctx: { supabase, auth }, input }) => {
  if (!isAdmin(auth)) {
    return new Error("Not authorized");
  }

  const { data, error } = await supabase.from("user").select().eq("id", auth.user_id).single();

  if (error) {
    console.error(error);
    return new Error(`ERROR -- getUserProfile failed. user_id: ${auth.user_id}, message: ${error.message}`);
  }

  return data as any;
});
