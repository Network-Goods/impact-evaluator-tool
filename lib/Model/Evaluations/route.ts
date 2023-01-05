
import { Commands as EvaluationCommands, Events as EvaluationEvents } from '.';
import { Command, CommandHandler, } from "../Commands";
import { EventHandler, Event } from '../Event';

export function route_command(command: Command): CommandHandler | null {
    switch (command.kind) {
        case EvaluationCommands.CreateEvaluation.kind:
            return EvaluationCommands.CreateEvaluation;
        case EvaluationCommands.DeleteEvaluation.kind:
            return EvaluationCommands.DeleteEvaluation;
        default:
            return null;
    }
}

export const event_handlers = [EvaluationEvents.EvaluationCreated, EvaluationEvents.EvaluationDeleted];
