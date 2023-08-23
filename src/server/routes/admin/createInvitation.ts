import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const createInvitation = adminProcedure.input(z.any()).mutation(async ({ ctx: { db }, input }) => {
  try {
    await db.Invitation.create({
      data: input,
    });
  } catch (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert invitation.`);
  }
});
