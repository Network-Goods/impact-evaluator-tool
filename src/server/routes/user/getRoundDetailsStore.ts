import { userProcedure } from "../../trpc";
import { z } from "zod";

export const getRoundDetailsStore = userProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { db, auth }, input }) => {
    try {
      const submissions = await db.submission.findMany({
        where: {
          evaluation_id: input.evaluation_id,
          user_id: auth.user_id,
        },
        select: {
          id: true,
          name: true,
          github_link: true,
          description: true,
          links: true,
          github_handle: true,
          user_id: true,
          is_submitted: true,
          contract_id: true,
          evaluation_id: true,
          submission_field: {
            select: {
              id: true,
              field_body: true,
              fields_id: true,
              evaluation_field: {
                select: {
                  heading: true,
                  subheading: true,
                  char_count: true,
                  placeholder: true,
                },
              },
            },
          },
        },
      });

      const evaluation = await db.evaluation.findUnique({
        where: { id: input.evaluation_id },
      });

      return {
        submissions,
        evaluation,
      };
    } catch (error) {
      console.error(error);
      throw new Error(`ERROR -- getRoundDetailsStore failed. evaluation_id: ${input.evaluation_id}`);
    }
  });
