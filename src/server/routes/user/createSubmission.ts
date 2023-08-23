import { isAdmin } from "src/lib/rpc";
import { userProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";

export const createSubmission = userProcedure
  .input(
    z.object({
      id: z.string(),
      user_id: z.string().optional().nullish(),
      name: z.string(),
      github_link: z.string().optional().nullish(),
      github_handle: z.string().optional().nullish(),
      evaluation_id: z.string(),
      description: z.any(),
      links: z.any(),
      is_submitted: z.boolean().optional(),
      contract_id: z.string().optional().nullish(),
    }),
  )
  .mutation(async ({ ctx: { db, auth }, input }) => {
    if (!isAdmin(auth) && input.user_id != auth.user_id) {
      return new Error(`Unauthorized`);
    }
    try {
      const newSubmission = await db.submission.create({
        data: {
          id: input.id,
          user_id: input.user_id || null,
          name: input.name,
          github_link: input.github_link,
          github_handle: input.github_handle,
          evaluation_id: input.evaluation_id,
          description: input.description,
          links: input.links,
          is_submitted: false,
        },

        select: {
          id: true,
          user_id: true,
          name: true,
          github_link: true,
          github_handle: true,
          evaluation_id: true,
          description: true,
          links: true,
          is_submitted: true,
        },
      });

      const evaluationFields = await db.evaluationField.findMany({
        where: {
          evaluation_id: input.evaluation_id,
        },
      });

      const submissionFields = await db.submissionField.createMany({
        data: evaluationFields.map((field) => ({
          id: uuid(),
          field_body: "",
          submission_id: newSubmission.id,
          fields_id: field.id,
        })),
      });
      console.log("submissionFields", submissionFields);

      return {
        submission: newSubmission,
        fields: submissionFields,
      };
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to insert submission.`);
    }
  });
