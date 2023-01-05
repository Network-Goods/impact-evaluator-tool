import { Evaluator } from "../Evaluator";


export const kind = 'Event.EvaluatorDeleted';
export const aggregate_id_field = 'evaluator_id';

export interface EvaluatorDeleted {
    kind: typeof kind,
    aggregate_id: string,
}

export function apply_deleted(event: EvaluatorDeleted): null | Error {
    return null;
}

export function init({ evaluator_id }: { evaluator_id: string }): EvaluatorDeleted {
    return {
        kind: kind,
        aggregate_id: evaluator_id,
    }
}
