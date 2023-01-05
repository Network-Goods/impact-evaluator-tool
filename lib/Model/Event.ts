import { EvaluationCreated, EvaluationDeleted  } from "./Evaluations/Events";

export type Event = EvaluationCreated.EvaluationCreated | EvaluationDeleted.EvaluationDeleted;

type Apply = {
    apply(state: any, event: Event): null | Error;
    apply_created?: never;
    apply_deleted?: never;
    kind: string;
    aggregate_id: string;
}

type ApplyCreated = {
    apply?: never;
    apply_created(event: Event): any | Error;
    apply_deleted?: never;
    kind: string;
}

type ApplyDeleted = {
    apply?: never;
    apply_created?: never;
    apply_deleted(event: Event): null | Error;
    kind: string;
}

export type EventHandler = Apply | ApplyCreated | ApplyDeleted; 

export type EventListener = {
    // TODO: Figure out why I can't type the event parameter as Event
    handler: (event: any) => Promise<void | Error>,
    eventKind: Event['kind'],
}