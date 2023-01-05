import { v4 as uuid } from "uuid";

import { Evaluator } from "../Evaluator";
import { EvaluatorDeleted } from "../Events";


export const kind = 'Command.DeleteEvaluator';
export const aggregate_id_field = 'evaluator_id';

export interface DeleteEvaluator {
    evaluator_id: string,
    kind: typeof kind,
}

export function init(evaluator_id: string): DeleteEvaluator {
    return {
        kind: kind,
        evaluator_id: evaluator_id,
    }
}

export function handle(state: Evaluator, command: DeleteEvaluator): EvaluatorDeleted.EvaluatorDeleted | Error {
    return EvaluatorDeleted.init(command);
}