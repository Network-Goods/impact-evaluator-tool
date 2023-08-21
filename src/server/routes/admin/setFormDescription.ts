import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormDescription = adminProcedure
  .input(
    z.object({
      id: z.string(),
      description: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase
      .from("evaluation")
      .update({ form_description: input.description })
      .eq("id", input.id);
    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form description. evaluation id: ${input.id}`);
    }
  });
