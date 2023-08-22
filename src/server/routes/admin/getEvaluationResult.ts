import { isAdmin } from "src/lib/rpc";
import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const getEvaluationResult = adminProcedure
  .input(
    z.object({
      user_id: z.string().nullish(),
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { db, auth }, input }) => {
    input.user_id = input.user_id ? input.user_id : auth.user_id;

    if (!isAdmin(auth) && input.user_id != auth.user_id) {
      return new Error(`Unauthorized`);
    }

    try {
      const evaluation_id = input.evaluation_id;

      const votes = await db.votes.findMany({
        where: { evaluator: { evaluation_id: evaluation_id } },
        select: { evaluator_id: true, submission_id: true, votes: true },
      });

      const evaluation = await db.evaluation.findUnique({
        where: { id: evaluation_id },
      });

      const submissions = await db.submission.findMany({
        where: { evaluation_id },
      });

      const evaluators = await db.evaluator.findMany({
        where: { evaluation_id },
        select: {
          id: true,
          voice_credits: true,
          user: {
            select: { github_handle: true },
          },
        },
      });

      return {
        evaluators: evaluators.map((evaluator) => ({
          evaluator_id: evaluator.id,
          github_handle: evaluator.user.github_handle,
          voice_credits: evaluator.voice_credits,
        })),
        submissions,
        votes,
        evaluation,
      };
    } catch (error) {
      console.error(error);
      return new Error(
        `ERROR -- get_evaluation_result_store failed. user_id: ${input.user_id}, evaluation_id: ${input.evaluation_id}`,
      );
    }
  });
