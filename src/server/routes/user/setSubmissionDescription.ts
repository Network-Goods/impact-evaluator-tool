import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setSubmissionDescription = userProcedure
  .input(
    z.object({
      id: z.string(),
      description: z.any(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    await db.submission.update({
      where: { id: input.id },
      data: { description: input.description },
    });
  });
