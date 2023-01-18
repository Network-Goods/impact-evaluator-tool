import { TextField } from "@mui/material";
import { FC, useState } from "react";
import { useEvaluationStore } from "./EvaluationStore";

export const RoundCodes: FC = () => {
  const store = useEvaluationStore();
  const [code, setCode] = useState("");

  const onCodeChange = (event: any) => {
    setCode(event.target.value);
  };

  if (!store.evaluation) {
    return <div>Error: Evaluation not defined</div>;
  }

  return (
    <div>
      <div className="flex flex-col p-10">
        <div>Create unique code for Impact Evaluator round</div>
        <TextField
          fullWidth
          onChange={onCodeChange}
          placeholder="Your answer"
          variant="standard"
          value={code}
        />
      </div>
    </div>
  );
};

export default RoundCodes;
