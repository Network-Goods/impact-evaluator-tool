import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDashboardStore } from "./store";

const CreateEvaluationButton = () => {
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
    <Button
      disabled={disabled}
      className=""
      variant="contained"
      onClick={() => onClick()}
    >
      Create Round
    </Button>
  );
};

export default CreateEvaluationButton;
