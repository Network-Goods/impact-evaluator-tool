import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormFieldPlaceholder = adminProcedure
  .input(
    z.object({
      id: z.string(),
      placeholder: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase
      .from("evaluation_field")
      .update({ placeholder: input.placeholder })
      .eq("id", input.id);
    console.log("hello?", input);
    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form field placeholder. evaluation id: ${input.id}`);
    }
  });
