import { Command, CommandHandler, } from "../Commands";
import { Model } from '../Model'; 


export interface Evaluator {
    id: string;
    user_id: string;
    status: "not-started" | "inprogress" | "submitted";
}

export const identifier = 'Aggregates.Evaluators';

