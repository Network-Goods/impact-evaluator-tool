import { router } from "../../trpc";
import { createEvaluation } from "./createEvaluation";
import { createFormField } from "./createFormField";
import { createInvitation } from "./createInvitation";
import { deleteEvaluation } from "./deleteEvaluation";
import { deleteFormField } from "./deleteFormField";
import { deleteInvitation } from "./deleteInvitation";

export const admin = router({
  createEvaluation,
  createFormField,
  createInvitation,
  deleteEvaluation,
  deleteFormField,
  deleteInvitation,
});
