import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormFieldCharCount = adminProcedure
  .input(
    z.object({
      id: z.string(),
      char_count: z.number(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase
      .from("evaluation_field")
      .update({ char_count: input.char_count })
      .eq("id", input.id);
    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form field character count. evaluation id: ${input.id}`);
    }
  });
