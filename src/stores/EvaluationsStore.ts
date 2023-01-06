import { unstable_useId } from "@mui/material";
import { makeObservable, observable, computed, action, flow } from "mobx";
import { supabase } from "../lib/supabase";
import { v4 as uuid } from "uuid";

export interface Evaluation {
    id: string;
    title: string;
    polling_method: "undefined" | "quadratic-voting" | "quantitative-evaluation";
    status: "draft" | "started" | "closed";
} 

export class EvaluationsStore {
    evaluations: Evaluation[] = [];

    constructor() {
        makeObservable(this);
    }

    @action async load() {
        const { data, error } = await supabase.from("evaluation").select();
        if (error) {
          console.error(new Error(`loadEvaluations failed: ${error.message}`));
        }

        this.evaluations = data;
    }

    @action async createEvaluation(): Promise<Evaluation | Error> {
        let newEvaluation: Evaluation = {
            id: uuid(),
            polling_method: 'undefined',
            status: 'draft',
            title: 'New Evaluation',
        };
        
        const { error } = await supabase.from("evaluation").insert([newEvaluation]);

        if (error) {
          return new Error(error.message);
        }

        return newEvaluation;
    }
}