import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const createFormField = adminProcedure.input(z.any()).mutation(async ({ ctx: { db }, input }) => {
  try {
    await db.evaluation_field.create({
      data: input,
    });
  } catch (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert form field.`);
  }
});
