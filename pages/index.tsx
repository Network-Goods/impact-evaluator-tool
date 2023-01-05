import { Button, Stack } from "@mui/material";
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
import { useRouter } from "next/router";

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
      console.log("DashboardProjection: setEvaluations", evaluations, evaluationCreated.evaluation);
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
  useEffect(() => {
    model.loadWith(supabase, {
      evaluationLoader: loadEvaluations,
    })
  }, []);


  let { evaluations } = DashboardProjection(model);

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <Navbar />

      <div className="w-[640px]">
        {evaluations.map(evaluation => EvaluationCard(evaluation))}
        <CreateEvaluationButton model={model} />
      </div>
    </div>
  );
};

  // return (<Wrapped model={model} />);

  // const state = useAsync(async () => {
  //   return 
  // }, []);

  //   if (state.loading) {
  //   return (
  //     <div>
  //       loading
  //     </div>
  //   );
  // }
  
  // if (state.error) {
  //   return (
  //     <div>
  //       loading failed
  //     </div>
  //   );
  // }


// function Wrapped({ model }: { model: Model }) {

// }

export function Navbar() {
  return (
    <div className="h-8 bg-[#102d70] w-full">
      <div className="pl-10 text-white pt-1">
        Impact Evaluator
      </div>
    </div>
  )
}

function EvaluationCard(evaluation: Evaluations.Evaluation) {
  return (
    <div className="border-2 border-t-0 p-4 flex justify-between" key={evaluation.id}>
      <div>{evaluation.title}</div>
      <EditEvaluationButton evaluation={evaluation} />
    </div>)
}

function EditEvaluationButton({ evaluation } : { evaluation: Evaluations.Evaluation }) {
  const router = useRouter();

  function editEvaluation() {
    router.push(`/evaluation/${evaluation.id}`);
  }

  return (
    <Button className='' variant="contained" onClick={() => editEvaluation()}>Edit</Button>
  )
}

export default Home;

function CreateEvaluationButton({ model }: { model: Model }) {
  let [disabled, set_disabled] = useState(false);

  async function on_click() {
    set_disabled(true);

    let command = Evaluations.Commands.CreateEvaluation.init();
    let res = await model.dispatch(command);
    console.log('onClick: CreateEvaluation');
    set_disabled(false);
  }

  return (
    <button disabled={disabled} onClick={() => on_click()}>
      Create Round
    </button>
  );
}