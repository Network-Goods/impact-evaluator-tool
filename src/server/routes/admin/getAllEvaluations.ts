import { adminProcedure } from "../../trpc";

export const getAllEvaluations = adminProcedure.query(async ({ ctx: { db } }) => {
  try {
    const data = await db.evaluation.findMany();
    return data || [];
  } catch (error) {
    console.error(error);
    return new Error(`ERROR -- failed to get all evaluations`);
  }
});
