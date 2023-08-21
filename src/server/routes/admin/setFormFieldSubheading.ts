import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormFieldSubheading = adminProcedure
  .input(
    z.object({
      id: z.string(),
      subheading: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase
      .from("evaluation_field")
      .update({ subheading: input.subheading })
      .eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form field subheading. evaluation id: ${input.id}`);
    }
  });
