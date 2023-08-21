import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setInvitationCredits = adminProcedure
  .input(
    z.object({
      id: z.string(),
      credits: z.number(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("invitation").update({ voice_credits: input.credits }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set inviation credits. invitation id: ${input.id}`);
    }
  });
