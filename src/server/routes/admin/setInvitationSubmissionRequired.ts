import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setInvitationSubmissionRequired = adminProcedure
  .input(
    z.object({
      id: z.string(),
      is_sme: z.boolean(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.Invitation.update({
        where: { id: input.id },
        data: { is_sme: input.is_sme },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set invitation submission required. invitation id: ${input.id}`);
    }
  });
