import { Evaluations } from ".";
import { Aggregate } from "./Aggregate";
import { Command, CommandHandler, CommandResult } from "./Commands";
import { EventHandler, Event, EventListener } from "./Event";
import { CommandRouter, EventRouter } from "./router";
import { Handlers as SyncHandlers } from './BackendSync';
import { Evaluation } from "./Evaluations";
import { SupabaseClient } from "@supabase/supabase-js";

export class Model {
    command_routers: CommandRouter[] = [];

    aggregates: { [id: string]: any } = {};

    event_applicators: { [event_kind: string]: EventHandler } = {};

    event_listeners: { [event_kind: string ]: EventListener['handler'][] } = {};

    addEventListeners(event_listeners: EventListener[]) {
        for (let event_listener of event_listeners) {
            this.addEventListener(event_listener)
        }
    }

    addEventListener(event_listener: EventListener) {
        if (!this.event_listeners[event_listener.eventKind]) {
            this.event_listeners[event_listener.eventKind] = [];
        }

        this.event_listeners[event_listener.eventKind].push(event_listener.handler);
    }

    addAggregate(aggreate: Aggregate) {
        this.command_routers.push(aggreate.route_command);

        for (let event_handler of aggreate.event_handlers) {
            if (!this.event_applicators[event_handler.kind]) {
                this.event_applicators[event_handler.kind] = event_handler;
            } else {
                // TODO: Better error handling
                console.error(`Attempted to register event applicator twice. event_handler.kind: ${event_handler.kind}`);
            }
        }
    }

    async dispatch(command: Command): Promise<void | Error> {
        let res = await this._dispatch(command);

        if (res) {
            console.error(`Failed to dispatch command: ${command.kind}`, res);
        }

        return res;
    }

    private async _dispatch(command: Command): Promise<void | Error> {
        let handler = this.get_command_handler(command);
        if (!handler) {
            return new Error(`Failed to get handle for command. Command.kind: ${command.kind}`);
        }

        // @ts-ignore
        let aggregate_id: string = command[handler.aggregate_id_field];

        // for when the ts-ignore betrays me
        if (!aggregate_id) {
            return new Error(`Failed to get aggregate id from command. Command.kind: ${command.kind}`);
        }

        let aggregate = this.aggregates[aggregate_id];

        let res: CommandResult;
        if (handler.handle) {
            if (!aggregate) {
                return new Error(`Failed to find aggregate for command. Command.kind: ${command.kind}, aggregate_id: ${aggregate_id}`);
            }

            res = handler.handle(aggregate, command);
        } else {
            res = handler.handle_create(aggregate, command);
        }

        if (res instanceof Error) {
            console.error(`Failed to handle command. Command.kind: ${command.kind}, aggregate_id: ${aggregate_id}`);
            return res;
        }

        let events = Array.isArray(res) ? res : [res];
        for (let event of events) {
            this.apply_event(event);
        }

        for (let event of events) {
            this.broadcast_event(event);
        }
    }

    private apply_event(event: Event) {
        let res = this._apply_event(event);
        if (res instanceof Error) {
            console.error(`Failed to apply event. event.kind: ${event.kind}`, res);
        }
    }

    private _apply_event(event: Event): void | Error {
        let handler = this.event_applicators[event.kind];
        if (!handler) {
            return new Error(`Failed to find event applicator for event. event.kind: ${event.kind}`)
        }

        let aggregate = this.aggregates[event.aggregate_id];

        if (handler.apply) {
            if (!aggregate) {

            }

            let res = handler.apply(aggregate, event);
            if (res instanceof Error) {
                return res;
            }
        } else if (handler.apply_created) {
            if (aggregate) {

            }

            let res = handler.apply_created(event);
            if (res instanceof Error) {
                return res;
            }

            this.aggregates[event.aggregate_id] = res;
        } else {
            if (!aggregate) {

            }

            let res = handler.apply_deleted(event);
            if (res instanceof Error) {
                return res;
            }

            delete this.aggregates[event.aggregate_id];
        }
    }

    private async broadcast_event(event: Event) {
        let event_listeners = this.event_listeners[event.kind];

        for (let event_listener of event_listeners) {
            let res = await event_listener(event);

            if (res instanceof Error) {
                console.error(`broadcastEvent failed. event.kind: ${event.kind} `, res);
            }
        }
    }
    
    private get_command_handler(command: Command): CommandHandler | null {
        for (let router of this.command_routers) {
            let handler = router(command);
            if (handler) {
                return handler;
            }
        }

        return null;
    }

    async loadWith(
        supabase: SupabaseClient,
        { evaluationLoader }: { evaluationLoader: (supabase: SupabaseClient) => Promise<Evaluation[] | Error> }
    ): Promise<void | Error> {
        let evaluations = await evaluationLoader(supabase);
        if (evaluations instanceof Error) {
            return evaluations;
        }

        for (let evaluation of evaluations) {
            this.aggregates[evaluation.id] = evaluation;
        }
    }

    getEvaluations(): Evaluation[] {
        let evals = Object.values(this.aggregates).filter(aggregate => aggregate.kind == Evaluations.kind);
        console.log('model.getEvaluations()', evals);
        return evals;
    }
}

export const model = new Model();
model.addAggregate(Evaluations);
model.addEventListeners(SyncHandlers);
