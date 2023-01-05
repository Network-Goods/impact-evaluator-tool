import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAsync } from "react-use";
import { Navbar } from "..";
import { Evaluations } from "../../lib/Model";
import { model } from "../../lib/Model/Model";
import { supabase } from "../../lib/supabase";
import { loadEvaluations } from "../../lib/utils/loaders";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const evaluation_id = id;

  const state = useAsync(async () => {
    return model.loadWith(supabase, {
      evaluationLoader: loadEvaluations,
    })
  }, []);

    if (state.loading) {
    return (
      <div>
        loading
      </div>
    );
  }
  
  if (state.error) {
    return (
      <div>
        loading failed
      </div>
    );
  }

  let evaluation = model.getEvaluations().find(evaluation => evaluation.id == evaluation_id);
  if (!evaluation) {
    return (
      <div>
        loading failed
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <Navbar />

      <div className="w-[640px]">
        <div className="flex justify-between">
          <div>{evaluation.title}</div>
          <DeleteEvaluationButton evaluation={evaluation} />
        </div>
      </div>
    </div>
  )
}

function DeleteEvaluationButton({ evaluation } : { evaluation: Evaluations.Evaluation }) {
  let [disabled, set_disabled] = useState(false);

  const router = useRouter();

  async function onClick() {
    set_disabled(true);

    let command = Evaluations.Commands.DeleteEvaluation.init(evaluation.id);
    let res = await model.dispatch(command);

    router.push(`/`);
  }

  return (
    <Button disabled={disabled} className='' variant="contained" onClick={() => onClick()}>Delete</Button>
  )
}