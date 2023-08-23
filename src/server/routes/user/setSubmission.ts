import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setSubmission = userProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.Submission.update({
        where: { id: input.id },
        data: { is_submitted: true },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set submission. submission id: ${input.id}`);
    }
  });
