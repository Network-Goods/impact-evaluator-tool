import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@mui/material";
import { Evaluation } from "src/gql/graphql";
import { useEvaluationStore } from "./EvaluationStore";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const CreateSubmissionButton = () => {
  const supabase = useSupabaseClient();
  const store = useEvaluationStore();
  const [disabled, set_disabled] = useState(false);
  const router = useRouter();

  if (!store.evaluation) {
    return <div>Error: No evaluation loaded</div>;
  }

  async function onClick() {
    set_disabled(true);

    const res = await store.createSubmission(supabase);

    if (res instanceof Error) {
      set_disabled(false);
      console.error(res);
      return;
    }

    router.push(
      `/admin/evaluation/${store.evaluation!.id}/submission/${res.id}`
    );
    set_disabled(false);
  }

  return (
    <Button
      disabled={disabled}
      className=""
      variant="contained"
      onClick={() => onClick()}
    >
      Create Submission
    </Button>
  );
};

export default CreateSubmissionButton;
