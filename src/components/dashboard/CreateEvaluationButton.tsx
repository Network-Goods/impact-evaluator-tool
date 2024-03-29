import { useRouter } from "next/router";
import Add from "public/images/svg/Add";
import { useState } from "react";
import Button from "src/components/shared/Button";
import { useDashboardStore } from "./DashboardStore";

export default function CreateEvaluationButton() {
  const dashboardStore = useDashboardStore();
  const [disabled, set_disabled] = useState(false);
  const router = useRouter();

  async function onClick() {
    set_disabled(true);

    const res = await dashboardStore.createEvaluation();

    if (res instanceof Error) {
      set_disabled(false);
      console.error(res);
      return;
    }

    router.push(`/evaluation/${res.id}`);
    set_disabled(false);
  }

  return (
    <div>
      <Button
        text="Create a Round"
        icon={<Add className="fill-white" />}
        onClick={() => console.log("Create a Round")}
        disabled
      />
    </div>
  );
}
