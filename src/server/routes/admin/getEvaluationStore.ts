import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const getEvaluationStore = adminProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { supabase, auth }, input }) => {
    const { error, data } = await supabase
      .from("evaluation")
      .select(
        "*, evaluation_field!evaluation_field_evaluation_id_fkey(*, submission_field(*)), submission(*), evaluator(*, user(*)), invitation(*)",
      )
      .eq("id", input.evaluation_id)
      .single();

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to get Evaluation Store`);
    }

    return (data as any) || [];
  });

// export const getEvaluationStore = adminProcedure
//   .input(
//     z.object({
//       evaluation_id: z.string(),
//     }),
//   )
//   .query(async ({ ctx: { db, auth }, input }) => {
//     try {
//       const data = await db.Evaluation.findUnique({
//         where: { id: input.evaluation_id },
//         include: {
//           evaluation_field: {
//             include: { submission_field: true },
//           },
//           submission: true,
//           evaluator: {
//             include: { user: true },
//           },
//           invitation: true,
//         },
//       });

//       return data || [];
//     } catch (error) {
//       console.error(error);
//       return new Error(`ERROR -- failed to get Evaluation Store`);
//     }
//   });
