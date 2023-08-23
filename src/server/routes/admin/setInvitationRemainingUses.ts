import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setInvitationRemainingUses = adminProcedure
  .input(
    z.object({
      id: z.string(),
      uses: z.number(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.Invitation.update({
        where: { id: input.id },
        data: { remaining_uses: input.uses },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set invitation remaining uses. invitation id: ${input.id}`);
    }
  });
