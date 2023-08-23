import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEmail = adminProcedure
  .input(
    z.object({
      email: z.string(),
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.User.update({
        where: { id: input.id },
        data: { preferred_email: input.email },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set user email. user id: ${input.id}`);
    }
  });
