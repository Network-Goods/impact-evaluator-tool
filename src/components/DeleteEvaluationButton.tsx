import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Evaluation } from "src/lib";
import { useEvaluationStore } from "./admin/Evaluation/EvaluationStore";

const DeleteEvaluationButton = ({ evaluation }: { evaluation: Evaluation }) => {
  const store = useEvaluationStore();
  let [disabled, set_disabled] = useState(false);
  const router = useRouter();

  async function onClick() {
    set_disabled(true);

    store.deleteEvaluation();

    router.push(`/`);
  }

  return (
    <Button
      disabled={disabled}
      className=""
      variant="contained"
      onClick={() => onClick()}
    >
      Delete
    </Button>
  );
};

export default DeleteEvaluationButton;
