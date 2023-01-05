
import { Event  } from './Event';
import * as CreateEvaluation from './Evaluations/Commands/CreateEvaluation';
import { EvaluationCreated } from './Evaluations/Events';

export type Command = CreateEvaluation.CreateEvaluation;

export type CommandResult = Event | Error;

type HandleCreate = {
    handle_create(state: any | null, command: any): EvaluationCreated.EvaluationCreated | Error;
    handle?: never;
    aggregate_id_field: string;
}

interface Handle {
    handle_created?: never;
    handle(state: any, command: any): EvaluationCreated.EvaluationCreated | Error;
    aggregate_id_field: string;
}

export type CommandHandler = Handle | HandleCreate;
