import { Stack } from "@mui/material";
import Login from "../components/Login";
import { Model, model } from '../lib/Model/Model';
import { supabase } from "../lib/supabase";
import { loadEvaluations } from "../lib/utils/loaders";
import {useAsync} from 'react-use';
import { stat } from "fs";
import { useEffect, useState } from "react";
import { Evaluations } from "../lib/Model";
import { EventListener, Event } from "../lib/Model/Event";
import { EvaluationCreated } from "../lib/Model/Evaluations/Events/EvaluationCreated";
import { EvaluationDeleted } from "../lib/Model/Evaluations/Events/EvaluationDeleted";

function DashboardProjection (model: Model) {

  const [evaluations, setEvaluations] = useState<Evaluations.Evaluation[]>(model.getEvaluations());

  const [evaluationDeleted, handleEvaluationDeleted] = useState<EvaluationDeleted | null>(null)
  const [evaluationCreated, handleEvaluationCreated] = useState<EvaluationCreated | null>(null)

  model.addEventListener({
    handler: async (event: EvaluationCreated) => {
      handleEvaluationCreated(event)
    },
    eventKind: Evaluations.Events.EvaluationCreated.kind,
  });

  model.addEventListener({
    handler: async (event: EvaluationDeleted) => {
      handleEvaluationDeleted(event)
    },
    eventKind: Evaluations.Events.EvaluationCreated.kind,
  });

  useEffect(() => {
    if (evaluationCreated) {
      console.log("got evaluation created event", evaluations, evaluationCreated.evaluation);
      setEvaluations([...model.getEvaluations()]);
      // setEvaluations(evaluations.concat(evaluationCreated.evaluation));
    }
  }, [evaluationCreated]);

  useEffect(() => {
    if (evaluationDeleted) {
      setEvaluations(evaluations.filter((evaluation) => evaluation.id !== evaluationDeleted.evaluation_id));
    }
  }, [evaluationDeleted]);

  return {
    evaluations: evaluations,
  }
}

const Home = () => {
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

  return (<div className="bg-black">tests</div>)

  // return (<Wrapped model={model} />);
};





function Wrapped({ model }: { model: Model }) {
  let { evaluations } = DashboardProjection(model);
  console.log('num evals: ', evaluations.length)

  return (
    <div>
      {evaluations.map(evaluation => EvaluationCard(evaluation))}
      <CreateEvaluationButton model={model} />
    </div>
  );
}

function EvaluationCard(evaluation: Evaluations.Evaluation) {
  return (<div key={evaluation.id}>{evaluation.title}</div>)
}

export default Home;

function CreateEvaluationButton({ model }: { model: Model }) {
  let [disabled, set_disabled] = useState(false);

  async function on_click() {
    set_disabled(true);

    let command = Evaluations.Commands.CreateEvaluation.init();
    let res = await model.dispatch(command);
    set_disabled(false);
  }

  return (
    <button disabled={disabled} onClick={() => on_click()}>
      Create Round
    </button>
  );
}