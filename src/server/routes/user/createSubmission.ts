import { userProcedure } from "../../trpc";
import { z } from "zod";
import { createSubmissionUtil } from "src/server/utils";

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
    return createSubmissionUtil({ db, auth, input });
  });
