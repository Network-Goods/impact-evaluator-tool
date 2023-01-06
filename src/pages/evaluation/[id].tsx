import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";


export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const evaluation_id = id;


  return '';
}

// function DeleteEvaluationButton({ evaluation } : { evaluation: Evaluations.Evaluation }) {
//   let [disabled, set_disabled] = useState(false);

//   const router = useRouter();

//   async function onClick() {
//     set_disabled(true);

//     let command = Evaluations.Commands.DeleteEvaluation.init(evaluation.id);
//     let res = await model.dispatch(command);

//     router.push(`/`);
//   }

//   return (
//     <Button disabled={disabled} className='' variant="contained" onClick={() => onClick()}>Delete</Button>
//   )
// }