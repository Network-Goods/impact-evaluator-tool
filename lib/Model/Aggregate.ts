import { CommandHandler } from "./Commands";
import { EventHandler } from "./Event";
import { CommandRouter, EventRouter } from "./router";

export interface Aggregate {
    route_command: CommandRouter,
    event_handlers: EventHandler[],
    kind: string,
}