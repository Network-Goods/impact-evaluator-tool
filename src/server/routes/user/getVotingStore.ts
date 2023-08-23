import { isAdmin } from "src/lib/rpc";
import { Evaluation, Evaluator, Submission } from "src/lib";
import { userProcedure } from "../../trpc";
import { z } from "zod";
import { submission, evaluation } from "@prisma/client";

export const getVotingStore = userProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { supabase, auth }, input }) => {
    if (!isAdmin(auth)) {
      // return new Error(`Unauthorized`);
    }

    // User has to be evaluator for the evaluation for get_voting_store to work

    const { data, error } = await supabase
      .rpc("get_voting_store", {
        in_evaluation_id: input.evaluation_id,
        in_user_id: auth.user_id,
      })
      .single();

    if (error) {
      console.error(error);
      // return new Error(
      //   `ERROR -- get_voting_store failed. user_id: ${auth.user_id}, evaluation_id: ${input.evaluation_id}`,
      // );
    }

    const d: any = data;

    return {
      submissions: (d.submissions || []) as submission[],
      evaluator: d.evaluator,
      evaluation: d.evaluation as evaluation,
      votes: d.votes || {},
    };
  });

// export const getVotingStore = userProcedure
//   .input(
//     z.object({
//       evaluation_id: z.string(),
//     }),
//   )
//   .query(async ({ ctx: { db, auth }, input }) => {
//     if (!isAdmin(auth)) {
//       return new Error(`Unauthorized`);
//     }

//     const evaluator = await db.evaluator.findFirst({
//       where: {
//         user_id: auth.user_id,
//         evaluation_id: input.evaluation_id,
//       },
//       select: {
//         id: true,
//         voice_credits: true,
//       },
//     });

//     if (!evaluator) {
//       throw new Error(`User is not assigned as evaluator for evaluation. evaluation_id: ${input.evaluation_id}`);
//     }

//     const evaluation = await db.evaluation.findUnique({
//       where: { id: input.evaluation_id },
//     });

//     const submissions = await db.submission.findMany({
//       where: { evaluation_id: input.evaluation_id },
//       select: {
//         submission_field: {
//           select: {
//             id: true,
//             field_body: true,
//             fields_id: true,
//             evaluation_field: {
//               select: {
//                 heading: true,
//                 subheading: true,
//                 char_count: true,
//                 placeholder: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     const votesArray = await db.votes.findMany({
//       where: {
//         evaluator_id: evaluator.id,
//         submission: { evaluation_id: input.evaluation_id },
//       },
//       select: {
//         submission_id: true,
//         votes: true,
//       },
//     });

//     const votes = votesArray.reduce<Record<string, (typeof votesArray)[0]["votes"]>>((acc, vote) => {
//       acc[vote.submission_id] = vote.votes;
//       return acc;
//     }, {});

//     return {
//       submissions,
//       evaluator,
//       evaluation,
//       votes,
//     };
//   });
