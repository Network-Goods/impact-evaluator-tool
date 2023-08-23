import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setUserID = adminProcedure
  .input(
    z.object({
      id: z.string(),
      user_id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.submission.update({
        where: { id: input.id },
        data: { user_id: input.user_id },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set user id. submission id: ${input.id}`);
    }
  });
