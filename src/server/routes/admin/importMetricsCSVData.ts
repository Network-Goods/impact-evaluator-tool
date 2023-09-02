import { adminProcedure } from "src/server/trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";

export const importMetricsCSVData = adminProcedure
  .input(
    z.object({
      csvFile: z.string(),
      evaluation_id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    const parsedData = JSON.parse(input.csvFile);

    const fixedColumns = ["submission_name", "submission_id", "representative_github"];
    const dynamicColumns = Object.keys(parsedData[0]).filter((column) => !fixedColumns.includes(column));

    const createdEvaluationMetrics = [];
    const evaluationMetricIds = new Map();
    for (const column of dynamicColumns) {
      const evaluationMetric = await db.evaluationMetric.create({
        data: {
          id: uuid(),
          name: column,
          evaluation_id: input.evaluation_id,
        },
      });
      evaluationMetricIds.set(column, evaluationMetric.id);
    }

    const validData = parsedData.filter((row: any) => row.submission_name); //preventing empty rows from being added
    for (const row of validData) {
      for (const column of dynamicColumns) {
        await db.submissionMetricValue.create({
          data: {
            id: uuid(),
            evaluation_metric_id: evaluationMetricIds.get(column),
            submission_id: row.submission_id,
            value: row[column],
          },
        });
      }
    }

    for (const column of dynamicColumns) {
      const evaluationMetricWithValues = await db.evaluationMetric.findUnique({
        where: {
          id: evaluationMetricIds.get(column),
        },
        include: {
          submission_metric_value: true,
        },
      });
      createdEvaluationMetrics.push(evaluationMetricWithValues);
    }

    return createdEvaluationMetrics;
  });
