import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setSubmission = userProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("submission").update({ is_submitted: true }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set submission. submission id: ${input.id}`);
    }
  });
