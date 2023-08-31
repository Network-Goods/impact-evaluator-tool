import { adminProcedure } from "src/server/trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";

export const importCSVData = adminProcedure
  .input(
    z.object({
      csvFile: z.string(),
      evaluation_id: z.string(),
      user_id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    const submissionsForEvaluation = await db.submission.findMany({
      where: { evaluation_id: input.evaluation_id },
      select: { id: true },
    });

    for (let { id: submissionId } of submissionsForEvaluation) {
      await db.submissionField.deleteMany({ where: { submission_id: submissionId } });
    }

    await db.evaluationField.deleteMany({ where: { evaluation_id: input.evaluation_id } });

    await db.submission.deleteMany({ where: { evaluation_id: input.evaluation_id } });

    const parsedData = JSON.parse(input.csvFile);

    const firstRow = parsedData[0];
    const fixedColumns = [
      "project_name",
      "submitter_github",
      "submitter_email",
      "representative_github",
      "github_link",
      "links",
      "contract_id",
    ];
    const dynamicColumns = Object.keys(firstRow).filter((column) => !fixedColumns.includes(column));

    const createdEvaluationFields = [];
    const evaluationFieldIds = new Map();
    for (const column of dynamicColumns) {
      const evaluationField = await db.evaluationField.create({
        data: {
          id: uuid(),
          heading: column,
          evaluation_id: input.evaluation_id,
          char_count: 1000,
          placeholder: "IMPORT - will not be seen by user",
        },
      });
      evaluationFieldIds.set(column, evaluationField.id);
      createdEvaluationFields.push(evaluationField);
    }

    const validData = parsedData.filter((row: any) => row.project_name); //preventing empty rows from being added
    for (const row of validData) {
      const submissionId = uuid();
      const submissionData = {
        id: submissionId,
        name: row.project_name,
        github_link: row.github_link,
        evaluation_id: input.evaluation_id,
        links: JSON.parse(row.links || "[]"),
        github_handle: row.representative_github,
        user_id: input.user_id,
        contract_id: row.contract_id,
        is_submitted: true,
        description: "",
      };
      const newSubmission = await db.submission.create({
        data: submissionData,
      });

      for (const column of dynamicColumns) {
        await db.submissionField.create({
          data: {
            id: uuid(),
            fields_id: evaluationFieldIds.get(column),
            submission_id: newSubmission.id,
            field_body: row[column],
          },
        });
      }
    }

    return createdEvaluationFields;
  });
