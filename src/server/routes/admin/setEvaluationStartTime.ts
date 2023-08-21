import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationStartTime = adminProcedure
  .input(
    z.object({
      id: z.string(),
      time: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("evaluation").update({ start_time: input.time }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation start time. evaluation id: ${input.id}`);
    }
  });
