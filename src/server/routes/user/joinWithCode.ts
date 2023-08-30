import { userProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { createSubmissionUtil } from "src/server/utils";
import { Submission } from "src/lib";

export const joinWithCode = userProcedure
  .input(
    z.object({
      user_id: z.string(),
      code: z.string(),
      preferred_email: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db, auth }, input }) => {
    try {
      const invite = await db.invitation.findFirst({
        where: { code: input.code },
      });

      if (!invite) {
        return { error: `Invalid invite code. code: ${input.code}` };
      }

      const existingEvaluator = await db.evaluator.findFirst({
        where: {
          evaluation_id: invite.evaluation_id,
          user_id: input.user_id,
        },
      });

      if (existingEvaluator) {
        return { error: "User has already joined this round" };
      }

      if (invite.remaining_uses <= 0) {
        return { error: "Code has been used too many times, please contact support" };
      }

      await db.user.update({
        where: { id: input.user_id },
        data: { preferred_email: input.preferred_email },
      });

      await db.evaluator.create({
        data: {
          id: uuid(),
          evaluation_id: invite.evaluation_id,
          user_id: input.user_id,
          voice_credits: invite.voice_credits,
          is_submitted: false,
          is_sme: invite.is_sme,
          code: input.code,
        },
      });

      await db.invitation.update({
        where: { id: invite.id },
        data: { remaining_uses: invite.remaining_uses - 1 },
      });

      if (invite.is_sme) {
        return null;
      }

      const user = await db.user.findUnique({
        where: { id: input.user_id },
        select: { github_handle: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const { github_handle } = user;

      const initSubmission = Submission.init({
        evaluation_id: invite.evaluation_id,
        user_id: input.user_id,
        github_handle: github_handle,
      });

      const newSubmissionObject = await createSubmissionUtil({
        db,
        auth,
        input: initSubmission,
      });

      if (newSubmissionObject instanceof Error) {
        throw new Error("Create submission error");
      }

      if (newSubmissionObject && newSubmissionObject.submission) {
        const newSubmission = newSubmissionObject.submission;
        return {
          evaluationID: invite.evaluation_id,
          submission: newSubmission,
        };
      } else {
        throw new Error("Create submission error");
      }
    } catch (error) {
      console.error("Failed to join round", error, input);
      return {
        error: "Error: Please contact round administrator for support.",
      };
    }
  });
