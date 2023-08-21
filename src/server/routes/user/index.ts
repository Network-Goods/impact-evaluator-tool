import { router } from "../../trpc";
import { getDashboardStore } from "./getDashboardStore";
import { createSubmission } from "./createSubmission";
import { deleteSubmission } from "./deleteSubmission";
import { getRoundDetailsStore } from "./getRoundDetailsStore";
import { getSubmissionStore } from "./getSubmissionStore";
import { setGithubHandle } from "./setGithubHandle";
import { setSubmissionTitle } from "./setSubmissionTitle";
import { setSubmissionField } from "./setSubmissionField";
import { setSubmission } from "./setSubmission";
import { setLink } from "./setLink";
import { setGithubLink } from "./setGithubLink";
import { joinWithCode } from "./joinWithCode";
import { getUserProfile } from "./getUserProfile";
import { getVotingStore } from "./getVotingStore";
import { setResetVotes } from "./setResetVotes";
import { setVote } from "./setVote";
import { setEvaluatorSubmission } from "./setEvaluatorSubmission";

export const user = router({
  getDashboardStore,
  createSubmission,
  deleteSubmission,
  getRoundDetailsStore,
  getSubmissionStore,
  setGithubHandle,
  setSubmissionTitle,
  setSubmissionField,
  setSubmission,
  setLink,
  setGithubLink,
  joinWithCode,
  getUserProfile,
  getVotingStore,
  setResetVotes,
  setVote,
  setEvaluatorSubmission,
});
