import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDashboardStore } from "./store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const CreateEvaluationButton = () => {
  const supabase = useSupabaseClient();
  const dashboardStore = useDashboardStore();
  const [disabled, set_disabled] = useState(false);
  const router = useRouter();

  async function onClick() {
    set_disabled(true);

    const res = await dashboardStore.createEvaluation(supabase);

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
