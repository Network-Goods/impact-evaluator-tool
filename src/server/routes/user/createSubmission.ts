import { isAdmin } from "src/lib/rpc";
import { userProcedure } from "../../trpc";
import { z } from "zod";

export const createSubmission = userProcedure
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
// export const createSubmission = userProcedure
//   .input(
//     z.object({
//       id: z.string(),
//       user_id: z.string().nullish(),
//       name: z.string(),
//       github_link: z.string(),
//       github_handle: z.string(),
//       evaluation_id: z.string(),
//       description: z.any(),
//       links: z.any(),
//     }),
//   )
//   .mutation(async ({ ctx: { db, auth }, input }) => {
//     if (!isAdmin(auth) && input.user_id != auth.user_id) {
//       return new Error(`Unauthorized`);
//     }
//     try {
//       await db.submission.create({
//         data: {
//           id: input.id,
//           user_id: input.user_id || null,
//           name: input.name,
//           github_link: input.github_link,
//           github_handle: input.github_handle,
//           evaluation_id: input.evaluation_id,
//           description: input.description,
//           links: input.links,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       return new Error(`ERROR -- failed to insert submission.`);
//     }
//   });
