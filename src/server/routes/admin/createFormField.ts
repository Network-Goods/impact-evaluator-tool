import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const createFormField = adminProcedure.input(z.any()).mutation(async ({ ctx: { supabase, auth }, input }) => {
  const { data, error } = await supabase.from("evaluation_field").insert([input]);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert form field.`);
  }
});
