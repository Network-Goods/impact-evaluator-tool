import { v4 as uuid } from "uuid";

import { Evaluation } from "../Evaluation";
import { EvaluationCreated } from "../Events";


export const kind = 'Command.CreateEvaluation';
export const aggregate_id_field = 'evaluation_id';

export interface CreateEvaluation {
    evaluation_id: string,
    kind: typeof kind,
}

export function init(): CreateEvaluation {
    return {
        kind: kind,
        evaluation_id: uuid(),
    }
}


export function handle_create(state: Evaluation | null, command: CreateEvaluation): EvaluationCreated.EvaluationCreated | Error {
    if (state) {
        return new Error('Evaluation already exists');
    }

    return EvaluationCreated.init(command);
}