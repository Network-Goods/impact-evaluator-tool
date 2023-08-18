import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const createInvitation = adminProcedure.input(z.any()).mutation(async ({ ctx: { supabase, auth }, input }) => {
  const { data, error } = await supabase.from("invitation").insert([input]);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert form field.`);
  }
});
