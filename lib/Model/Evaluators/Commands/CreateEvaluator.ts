import { v4 as uuid } from "uuid";

import { Evaluator } from "../Evaluator";
import { EvaluatorCreated } from "../Events";


export const kind = 'Command.CreateEvaluator';
export const aggregate_id_field = 'evaluator_id';

export interface CreateEvaluator {
    evaluator_id: string,
    user_id: string,
    kind: typeof kind,
}

export function init(user_id: string): CreateEvaluator {
    return {
        kind: kind,
        evaluator_id: uuid(),
        user_id: user_id,
    }
}

export function handle_null(state: Evaluator | null, command: CreateEvaluator): EvaluatorCreated.EvaluatorCreated | Error {
    if (state) {
        return new Error('Evaluator already exists');
    }

    return EvaluatorCreated.init(command);
}