import { v4 as uuid } from "uuid";

import { Evaluation } from "../Evaluation";
import { EvaluationDeleted } from "../Events";


export const kind = 'Command.DeleteEvaluation';
export const aggregate_id_field = 'evaluation_id';

export interface DeleteEvaluation {
    evaluation_id: string,
    kind: typeof kind,
}

export function init(evaluation_id: string): DeleteEvaluation {
    return {
        kind: kind,
        evaluation_id: evaluation_id,
    }
}


export function handle(state: Evaluation, command: DeleteEvaluation): EvaluationDeleted.EvaluationDeleted | Error {
    return EvaluationDeleted.init(command);
}