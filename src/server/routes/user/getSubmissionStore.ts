import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const getSubmissionStore = userProcedure
  .input(
    z.object({
      submission_id: z.string(),
    }),
  )
  .query(async ({ ctx: { supabase }, input }) => {
    const { error, data } = await supabase
      .from("submission")
      .select(
        "*, evaluation(description, name, evaluation_field!evaluation_field_evaluation_id_fkey(*, submission_field(*)))",
      )
      .eq("id", input.submission_id)
      .single();

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to get Submission Store`);
    }

    (data as any).evaluation.evaluation_field.sort((a: any, b: any) => a.field_order - b.field_order);

    return data as any;
  });
