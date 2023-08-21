import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormFieldHeading = adminProcedure
  .input(
    z.object({
      id: z.string(),
      heading: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("evaluation_field").update({ heading: input.heading }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form field heading. evaluation id: ${input.id}`);
    }
  });
