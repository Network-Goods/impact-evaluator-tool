import { adminProcedure } from "../../trpc";

export const getStatusStore = adminProcedure.query(async ({ ctx: { db }, input }) => {
  try {
    const evaluations = await db.evaluation.findMany();

    const results = [];
    for (let evaluationItem of evaluations) {
      const evaluators = await db.evaluator.findMany({
        where: {
          evaluation_id: evaluationItem.id,
          user: {
            NOT: {
              role: "admin",
            },
          },
        },
      });

      const num_evaluators = evaluators.length;
      const num_submitted = evaluators.filter((e) => e.is_submitted).length;

      results.push({
        name: evaluationItem.name,
        status: evaluationItem.status,
        num_evaluators,
        num_submitted,
      });
    }

    return results;
  } catch (error) {
    console.error(error);
    throw new Error(`ERROR -- get_status_store failed.`);
  }
});
