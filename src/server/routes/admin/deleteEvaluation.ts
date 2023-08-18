import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const deleteEvaluation = adminProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase.from("evaluation").delete().eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to delete evaluation. evaluation id: ${input.id}`);
    }
  });
