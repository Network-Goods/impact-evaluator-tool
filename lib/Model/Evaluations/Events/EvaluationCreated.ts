import { Evaluations } from "../..";
import { Evaluation } from "../Evaluation";


export const kind = 'Event.EvaluationCreated';

export interface EvaluationCreated {
    kind: typeof kind,
    evaluation: Evaluation,
    aggregate_id: string;
}

export function apply_created(event: EvaluationCreated): Evaluation | Error {
    return event.evaluation;
}

export function init({ evaluation_id }: { evaluation_id: string }): EvaluationCreated {
    let evaluation: Evaluation = {
        kind: 'Aggregates.Evaluations',
        id: evaluation_id,
        polling_method: 'undefined',
        status: 'draft',
        title: 'New Evaluation',
    }

    return {
        kind: kind,
        evaluation: evaluation,
        aggregate_id: evaluation_id,
    }
}
