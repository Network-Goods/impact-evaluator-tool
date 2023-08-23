import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setSubmission = userProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    await db.submission.update({
      where: { id: input.id },
      data: { is_submitted: true },
    });
  });
