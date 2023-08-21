import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationStatus = adminProcedure
  .input(
    z.object({
      id: z.string(),
      status: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("evaluation").update({ status: input.status }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation status. evaluation id: ${input.id}`);
    }
  });
