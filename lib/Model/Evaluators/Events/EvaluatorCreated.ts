import { Evaluator } from "../Evaluator";


export const kind = 'Event.EvaluatorCreated';

export interface EvaluatorCreated {
    kind: typeof kind,
    evaluator: Evaluator,
    aggregate_id: string,
}

export function init({ evaluator_id, user_id }: { evaluator_id: string, user_id: string }): EvaluatorCreated {
    let evaluator: Evaluator = {
        id: evaluator_id,
        user_id: user_id,
        status: 'not-started',
    }

    return {
        kind: kind,
        evaluator: evaluator,
        aggregate_id: evaluator_id,
    }
}

export function apply_created(event: EvaluatorCreated): Evaluator | Error {
    return event.evaluator;
}
