import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const getSubmissionStore = userProcedure
  .input(
    z.object({
      submission_id: z.string(),
    }),
  )
  .query(async ({ ctx: { db }, input }) => {
    try {
      const submission = await db.Submission.findUnique({
        where: { id: input.submission_id },
        include: {
          evaluation: {
            include: {
              evaluation_field: {
                include: {
                  submission_field: true,
                },
              },
            },
          },
        },
      });

      if (!submission) {
        return new Error(`Submission not found`);
      }

      if (submission.evaluation && submission.evaluation.evaluation_field) {
        submission.evaluation.evaluation_field.sort((a: any, b: any) => a.field_order - b.field_order);
      }

      return submission;
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to get Submission Store`);
    }
  });
