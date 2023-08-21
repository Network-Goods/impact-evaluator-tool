import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setUserID = adminProcedure
  .input(
    z.object({
      id: z.string(),
      user_id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase.from("submission").update({ user_id: input.user_id }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set user id. submission id: ${input.id}`);
    }
  });
