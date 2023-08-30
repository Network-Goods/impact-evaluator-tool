import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const createInvitation = adminProcedure.input(z.any()).mutation(async ({ ctx: { db }, input }) => {
  try {
    if (input.code !== "") {
      const existingCode = await db.invitation.findFirst({
        where: {
          code: input.code,
        },
      });

      if (existingCode) {
        return { error: `Code already exists. code: ${input.code}` };
      }
    }
    const createdData = await db.invitation.create({
      data: input,
    });

    return { success: true, data: createdData };
  } catch (error) {
    console.error(error);
    return { error: `ERROR -- failed to insert invitation.` };
  }
});
