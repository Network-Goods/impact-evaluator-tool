import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const createEvaluation = adminProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      status: z.string(),
      description: z.string(),
      start_time: z.string().nullish(),
      end_time: z.string().nullish(),
      form_description: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase.from("evaluation").insert([input]);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to insert evaluation.`);
    }
  });
