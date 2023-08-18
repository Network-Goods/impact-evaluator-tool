import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const deleteFormField = adminProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase.from("evaluation_field").delete().eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to delete form field. evaluation_field id: ${input.id}`);
    }
  });
