import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import DeleteEvaluationButton from "src/components/DeleteEvaluationButton";
import { useEvaluationStore } from "./EvaluationStore";

export const DetailsPage: FC = () => {
  const store = useEvaluationStore();
  if (!store.evaluation) {
    return <div>Error: Evaluation not defined</div>;
  }
  const [name, setName] = useState(store.evaluation.name);

  const onBlur = (event: any) => {
    store.setEvaluationName(event.target.value);
  };

  const onChange = (event: any) => {
    setName(event.target.value);
  };

  const handleChange = (event: any) => {
    store.setEvaluationStatus(event.target.value);
  };

  return (
    <div className="flex flex-col pb-4">
      <div className="flex w-[295px] pb-2">
        <span className="pr-4 leading-8">Title:</span>
        <TextField
          fullWidth
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Your answer"
          variant="standard"
          value={name}
        />
      </div>
      <div className="pb-2">
        <span className="pr-4 leading-10">Status:</span>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={store.evaluation.status}
            onChange={handleChange}
          >
            <FormControlLabel value="draft" control={<Radio />} label="Draft" />
            <FormControlLabel
              value="started"
              control={<Radio />}
              label="Started"
            />
            <FormControlLabel
              value="closed"
              control={<Radio />}
              label="Closed"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <DeleteEvaluationButton evaluation={store.evaluation} />
    </div>
  );
};
