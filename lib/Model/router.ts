import { Command, CommandHandler } from "./Commands";
import { EventHandler, Event } from "./Event";

export type CommandRouter = (command: Command) => CommandHandler | null;
export type EventRouter = (event: Event) => EventHandler | null;