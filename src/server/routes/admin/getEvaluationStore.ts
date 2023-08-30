import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const getEvaluationStore = adminProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { db, auth }, input }) => {
    try {
      const data = await db.evaluation.findUnique({
        where: { id: input.evaluation_id },
        include: {
          evaluation_field: {
            include: { submission_field: true },
          },
          submission: true,
          evaluator: {
            include: { user: true },
          },
          invitation: true,
        },
      });

      return data || [];
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to get Evaluation Store`);
    }
  });
