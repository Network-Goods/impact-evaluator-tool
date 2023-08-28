import { isAdmin } from "src/lib/rpc";
import { v4 as uuid } from "uuid";

export const createSubmissionUtil = async ({ db, auth, input }: { db: any; auth: any; input: any }) => {
  if (!isAdmin(auth) && input.user_id != auth.user_id) {
    return new Error(`Unauthorized`);
  }
  try {
    const newSubmission = await db.submission.create({
      data: {
        id: input.id,
        user_id: input.user_id || null,
        name: input.name,
        github_link: input.github_link,
        github_handle: input.github_handle,
        evaluation_id: input.evaluation_id,
        description: input.description,
        links: input.links,
        is_submitted: false,
      },

      select: {
        id: true,
        user_id: true,
        name: true,
        github_link: true,
        github_handle: true,
        evaluation_id: true,
        description: true,
        links: true,
        is_submitted: true,
      },
    });

    const evaluationFields = await db.evaluationField.findMany({
      where: {
        evaluation_id: input.evaluation_id,
      },
    });

    const submissionFields = await db.submissionField.createMany({
      data: evaluationFields.map((field: any) => ({
        id: uuid(),
        field_body: "",
        submission_id: newSubmission.id,
        fields_id: field.id,
      })),
    });
    console.log("submissionFields", submissionFields);

    return {
      submission: newSubmission,
      fields: submissionFields,
    };
  } catch (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert submission.`);
  }
};
