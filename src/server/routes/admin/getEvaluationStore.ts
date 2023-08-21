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
