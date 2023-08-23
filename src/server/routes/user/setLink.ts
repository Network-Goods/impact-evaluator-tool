import { userProcedure } from "src/server/trpc";
import { z } from "zod";

const newArrSchema = z.array(
  z.object({
    name: z.string(),
    value: z.string(),
  }),
);

export const setLink = userProcedure
  .input(
    z.object({
      id: z.string(),
      newArr: newArrSchema,
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.submission.update({
        where: { id: input.id },
        data: { links: JSON.stringify(input.newArr) },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set link title. submission id: ${input.id}`);
    }
  });
