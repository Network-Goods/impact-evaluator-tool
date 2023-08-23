import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setInvitationCode = adminProcedure
  .input(
    z.object({
      id: z.string(),
      code: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.Invitation.update({
        where: { id: input.id },
        data: { code: input.code },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set invitation code. invitation id: ${input.id}`);
    }
  });
