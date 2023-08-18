import { isAdmin } from "src/lib/rpc";
import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const createSubmission = adminProcedure
  .input(
    z.object({
      id: z.string(),
      user_id: z.string().nullish(),
      name: z.string(),
      github_link: z.string(),
      github_handle: z.string().nullish(),
      evaluation_id: z.string().nullish(),
      description: z.any(),
      links: z.any(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    if (!isAdmin(auth) && input.user_id != auth.user_id) {
      return new Error(`Unauthorized`);
    }
    const { data, error } = await supabase.rpc("create_submission", input);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to insert submission.`);
    }
  });
