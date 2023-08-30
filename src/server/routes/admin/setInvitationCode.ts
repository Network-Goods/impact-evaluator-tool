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
      const existingCode = await db.invitation.findFirst({
        where: {
          code: input.code,
        },
      });

      if (existingCode) {
        return { error: `Code already exists. code: ${input.code}` };
      }
      const newCode = await db.invitation.update({
        where: { id: input.id },
        data: { code: input.code },
      });

      return { success: true, data: newCode };
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set invitation code. invitation id: ${input.id}`);
    }
  });
