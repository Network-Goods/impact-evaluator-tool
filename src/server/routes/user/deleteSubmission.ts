import { isAdmin } from "src/lib/rpc";
import { userProcedure } from "../../trpc";
import { z } from "zod";

export const deleteSubmission = userProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    let { data, error: error1 } = await supabase.from("submission").select("user_id").eq("id", input.id).single();

    if (!data || error1) {
      return new Error("Failed to get user_id for auth");
    }

    if (!isAdmin(auth) && data.user_id != auth.user_id) {
      return new Error(`Unauthorized`);
    }

    const { error } = await supabase.from("submission").delete().eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to delete submission. submission id: ${input.id}`);
    }
  });
