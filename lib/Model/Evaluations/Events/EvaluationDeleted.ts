import { Evaluation } from "../Evaluation";


export const kind = 'Event.EvaluationDeleted';

export interface EvaluationDeleted {
    kind: typeof kind,
    evaluation_id: string,
    aggregate_id: string,
}

export function apply_deleted(event: EvaluationDeleted): null | Error {
    return null;
}

export function init({ evaluation_id }: { evaluation_id: string }): EvaluationDeleted {
    return {
        kind: kind,
        evaluation_id: evaluation_id,
        aggregate_id: evaluation_id,
    }
}
