import { userProcedure } from "../../trpc";

export const getDashboardStore = userProcedure.query(async ({ ctx: { db, auth } }) => {
  try {
    const evaluations = await db.evaluator.findMany({
      where: {
        user_id: auth.user_id,
      },
      select: {
        evaluation: {
          select: {
            id: true,
            name: true,
            status: true,
            description: true,
            start_time: true,
            end_time: true,
            form_description: true,
            evaluation_field: true,
            evaluator: true,
            invitation: true,
            submission: true,
          },
        },
        is_submitted: true,
      },
    });

    const transformedData = evaluations.map((item) => ({
      ...item.evaluation,
      is_submitted: item.is_submitted,
    }));

    return transformedData as any;
  } catch (error) {
    console.error(error);
    return new Error(`ERROR -- get_dashboard_store failed. user_id: ${auth.user_id}`);
  }
});
