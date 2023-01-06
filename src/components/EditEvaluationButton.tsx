import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Evaluation } from "../stores/EvaluationsStore";

const EditEvaluationButton = observer(({ evaluation } : { evaluation: Evaluation }) => {
    const router = useRouter();
  
    function editEvaluation() {
      router.push(`/evaluation/${evaluation.id}`);
    }
  
    return (
      <Button className='' variant="contained" onClick={() => editEvaluation()}>Edit</Button>
    )
});

export default EditEvaluationButton;