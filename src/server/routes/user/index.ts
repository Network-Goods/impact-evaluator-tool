import { router } from "../../trpc";
import { getDashboardStore } from "./getDashboardStore";
import { createSubmission } from "./createSubmission";

export const user = router({
  getDashboardStore,
  createSubmission,
});
