import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationDescription = adminProcedure
  .input(
    z.object({
      id: z.string(),
      description: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("evaluation").update({ description: input.description }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation description. evaluation id: ${input.id}`);
    }
  });
