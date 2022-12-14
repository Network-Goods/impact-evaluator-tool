// Client side store for synchronizing data for an evaluation round


import { Dispatch, SetStateAction, useState } from "react";
import { WrappedReactive, wrap_use_state } from "./utils";

type InviteMethod = 'invite' | 'withcode' | 'public';
type EvaluationMethod = 'QV' | 'RankedChoice';

interface Evaluator {
    user_id: string;
    evaluator_id: string;
}



export class EvaluationRound {
    invite_method: WrappedReactive<InviteMethod>;

    constructor() {
        this.invite_method = wrap_use_state('invite' as InviteMethod);
    }

    dispatch() {

    }
}

// export type EvaluationResult = { [evaluator_id: string]: number }; 

// order by project or by evaluator
// the final result must be by project

export interface EvaluationMethodI {
    kind: EvaluationMethod;
}

export interface QVEvaluatorSettings {
    evaluator_id: string;
    voice_credits: number;
}

export namespace QV {
    export interface EvaluatorResult {
        evaluator_id: string;
        votes: { [project_id: string]: number }; 
    }
}

// export class QV implements EvaluationMethodI {
//     readonly kind: EvaluationMethod = 'QV';

//     evaluator_settings: WrappedReactive<QVEvaluatorSettings[]>;
//     default_voice_credits: WrappedReactive<number>;

//     constructor() {
//         this.evaluator_settings = wrap_use_state([] as any);
//         this.default_voice_credits = wrap_use_state(100);
//     }

  
// }



















interface Action1 {
    kind: '1.1';
}

interface Action2 {
    kind: '1.2';
}

type Actions = Action1 | Action2;





// type TSVersion = "4.1.2"

// // We can create a type to extract the components of that string.
// // We'll split across two '.' characters.
// type ExtractSemver<SemverString extends string> =
//     SemverString extends `${infer Major}.${infer Minor}.${infer Patch}` ?
//     { major: Major, minor: Minor, patch: Patch } : { error: "Cannot parse semver string" }

// type TS = ExtractSemver<TSVersion>


//     type Split<S extends string, D extends string> =
//     string extends S ? string[] :
//     S extends '' ? [] :
//     S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];

// type S4 = Split<Actions['kind'], ".">;

// type ActionKind = Actions['kind'];

// let a: ActionKind = '1.1';

// let b: Split<Actions['kind'], ".">[0] = <any>a.split('.');

// Split<Actions['kind'], ".">
// S4[0]




// namespace Actions {
//     export function add_evaluation() {

//     }
// }