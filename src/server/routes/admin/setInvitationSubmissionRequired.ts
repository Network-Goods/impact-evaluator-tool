import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setInvitationSubmissionRequired = adminProcedure
  .input(
    z.object({
      id: z.string(),
      is_sme: z.boolean(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("invitation").update({ is_sme: input.is_sme }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set invitation submission required. invitation id: ${input.id}`);
    }
  });
