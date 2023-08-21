import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationName = adminProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("evaluation").update({ name: input.name }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation name. evaluation id: ${input.id}`);
    }
  });
