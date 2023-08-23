import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setInvitationCredits = adminProcedure
  .input(
    z.object({
      id: z.string(),
      credits: z.number(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.Invitation.update({
        where: { id: input.id },
        data: { voice_credits: input.credits },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set invitation credits. invitation id: ${input.id}`);
    }
  });
