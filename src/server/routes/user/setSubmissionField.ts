import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setSubmissionField = userProcedure
  .input(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.submission_field.update({
        where: { id: input.id },
        data: { field_body: input.value },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set submission field. submission id: ${input.id}`);
    }
  });
