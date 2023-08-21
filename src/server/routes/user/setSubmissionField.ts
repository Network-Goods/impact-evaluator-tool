import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setSubmissionField = userProcedure
  .input(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase
      .from("submission_field")
      .update({ field_body: input.value })
      .eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set submission field. submission id: ${input.id}`);
    }
  });
