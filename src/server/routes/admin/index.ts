import { router } from "../../trpc";
import { createEvaluation } from "./createEvaluation";
import { createFormField } from "./createFormField";
import { createInvitation } from "./createInvitation";
import { deleteEvaluation } from "./deleteEvaluation";
import { deleteFormField } from "./deleteFormField";
import { deleteInvitation } from "./deleteInvitation";
import { getAllEvaluations } from "./getAllEvaluations";
import { getEvaluationStore } from "./getEvaluationStore";
import { getStatusStore } from "./getStatusStore";
import { getSubmissions } from "./getSubmissions";
import { setEmail } from "./setEmail";
import { setEvaluationDescription } from "./setEvaluationDescription";
import { setEvaluationStartTime } from "./setEvaluationStartTime";
import { setEvaluationEndTime } from "./setEvaluationEndTime";
import { setEvaluationName } from "./setEvaluationName";
import { setEvaluationStatus } from "./setEvaluationStatus";
import { setFormDescription } from "./setFormDescription";
import { setFormFieldCharCount } from "./setFormFieldCharCount";
import { setFormFieldHeading } from "./setFormFieldHeading";
import { setFormFieldPlaceholder } from "./setFormFieldPlaceholder";
import { setFormFieldSubheading } from "./setFormFieldSubheading";
import { setInvitationCode } from "./setInvitationCode";
import { setInvitationCredits } from "./setInvitationCredits";
import { setInvitationRemainingUses } from "./setInvitationRemainingUses";
import { setInvitationSubmissionRequired } from "./setInvitationSubmissionRequired";
import { setUserID } from "./setUserID";
import { setVoiceCredits } from "./setVoiceCredits";
import { getEvaluationResult } from "./getEvaluationResult";
import { importCSVData } from "./importCSVData";

export const admin = router({
  createEvaluation,
  createFormField,
  createInvitation,
  deleteEvaluation,
  deleteFormField,
  deleteInvitation,
  getAllEvaluations,
  getEvaluationStore,
  getStatusStore,
  getSubmissions,
  setEmail,
  setEvaluationDescription,
  setEvaluationStartTime,
  setEvaluationEndTime,
  setEvaluationName,
  setEvaluationStatus,
  setFormDescription,
  setFormFieldCharCount,
  setFormFieldHeading,
  setFormFieldPlaceholder,
  setFormFieldSubheading,
  setInvitationCode,
  setInvitationCredits,
  setInvitationRemainingUses,
  setInvitationSubmissionRequired,
  setUserID,
  setVoiceCredits,
  getEvaluationResult,
  importCSVData,
});
