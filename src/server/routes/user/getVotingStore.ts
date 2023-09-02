import { isAdmin } from "src/lib/rpc";
import { userProcedure } from "../../trpc";
import { z } from "zod";

export const getVotingStore = userProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { db, auth }, input }) => {
    if (!isAdmin(auth)) {
      // return new Error(`Unauthorized`);
    }

    try {
      const evaluatorData = await db.evaluator.findFirst({
        where: {
          AND: [{ user_id: auth.user_id }, { evaluation_id: input.evaluation_id }],
        },
        select: {
          id: true,
          voice_credits: true,
        },
      });

      if (!evaluatorData) {
        throw new Error(`User is not assigned as evaluator for evaluation. evaluation_id: ${input.evaluation_id}`);
      }

      const evaluationData = await db.evaluation.findUnique({
        where: { id: input.evaluation_id },
      });

      const submissionsData = await db.submission.findMany({
        where: { evaluation_id: input.evaluation_id },
        select: {
          id: true,
          name: true,
          is_submitted: true,
          github_handle: true,
          github_link: true,
          links: true,
          submission_field: {
            select: {
              id: true,
              field_body: true,
              fields_id: true,
              evaluation_field: {
                select: {
                  heading: true,
                },
              },
            },
          },
          submission_metric_value: {
            select: {
              id: true,
              value: true,
              evaluation_metric: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const votesData = await db.votes.findMany({
        where: {
          evaluator_id: evaluatorData.id,
          submission: {
            evaluation_id: input.evaluation_id,
          },
        },
        select: {
          submission_id: true,
          votes: true,
        },
      });

      const votes = votesData.reduce<Record<string, number>>((acc, vote) => {
        acc[vote.submission_id] = vote.votes;
        return acc;
      }, {});

      return {
        submissions: submissionsData,
        evaluator: evaluatorData,
        evaluation: evaluationData,
        votes: votes,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
