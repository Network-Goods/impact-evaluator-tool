import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const deleteInvitation = adminProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.invitation.delete({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to delete invitation. invitation id: ${input.id}`);
    }
  });
