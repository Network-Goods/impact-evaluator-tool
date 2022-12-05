import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Evaluation } from '../types';
import { supabase } from '../supabase';

import { v4 as uuid } from 'uuid';

type SetEvaluations = Dispatch<SetStateAction<Evaluation[]>>;

export interface EvaluationsHook {
  value: Evaluation[];
  add_evaluation: () => Promise<Evaluation | null>;
  delete_evaluation: (evaluation: Evaluation) => Promise<void>;
}


export function use_evaluations(): EvaluationsHook {
  const [evaluations, set_evaluations] = useState<Evaluation[]>([]);

  fetch_evaluations(set_evaluations);

  return {
    value: evaluations,
    add_evaluation: () => add_evaluation(set_evaluations),
    delete_evaluation: (evaluation) => delete_evaluation(set_evaluations, evaluation),
  };
};

async function delete_evaluation(set_evaluations: SetEvaluations, evaluation: Evaluation): Promise<void> {
  try {
    await supabase.from('evaluations').delete().match({ id: evaluation.id });
    fetch_evaluations(set_evaluations);
  } catch (error: any) {
    console.log("failed to delete evaluation ", evaluation, error);
  }
}


async function add_evaluation(set_evaluations: SetEvaluations): Promise<Evaluation | null> {
  let new_evaluation: Evaluation = {
    id: uuid(),
    title: 'Untitled Evaluation',
    status: 'draft',
    kind: 'undefined',
  };

  try {
    await supabase.from('evaluations').insert([new_evaluation]);
    fetch_evaluations(set_evaluations);
    return new_evaluation;
  } catch (error: any) {
    console.log("failed to add evaluation ", new_evaluation, error);
    return null;
  }
}

async function fetch_evaluations(set_evaluations: SetEvaluations) {
    try {
      let { data }: { data: Evaluation[] | null } = await supabase.from('evaluations').select('*');

      if (!data) {
        data = [];
      }

      set_evaluations(data);
    } catch (error) {
      console.log('Failed to fetch evaluations', error);
    }
}

