import { Command, CommandHandler, } from "../Commands";
import { Model } from '../Model'; 

export const kind = 'Aggregates.Evaluations';

export interface Evaluation {
    kind: typeof kind,
    id: string;
    title: string;
    polling_method: "undefined" | "quadratic-voting" | "quantitative-evaluation";
    status: "draft" | "started" | "closed";
} 