import { Dispatch, SetStateAction, useState } from "react";
import { Evaluation } from "../../types";
import { v4 as uuid } from 'uuid';

import { QueryResult, QueryStatus, WrappedReactive, wrap_query, wrap_use_state } from "../../utils";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../supabase";
import { QueryClient } from "react-query";



export async function get_rounds(): Promise<Evaluation[]> {
    const { data, error, status } = await supabase.from('evaluation').select();
    if (error) {
        throw error;
    }

    console.log('get rounds');

    // console.log(data);

    return data as any;
}

export async function create_round(): Promise<Evaluation> {
  let new_evaluation: Evaluation = {
    id: uuid(),
    title: 'Untitled Evaluation',
    status: 'draft',
    kind: 'undefined',
  };


    await supabase.from('evaluations').insert([new_evaluation]);

    return new_evaluation;
}

export class DashboardStore {
    // rounds: QueryResult<Evaluation[]>; 
    rounds: WrappedReactive<Evaluation[]>;

    constructor() {
        console.log('new dashboard store');
        this.rounds = wrap_use_state<Evaluation[]>([]);
        // this.rounds = {
        //     value: [],
        //     status: QueryStatus.complete,
        //     promise: {} as any,
        // }
        
        // wrap_query(get_rounds);
    }

    load() {
        get_rounds().then(rounds => {
            this.rounds.set_value(rounds);
        });
    }

    create_round(): QueryResult<Evaluation>  {
        return wrap_query(create_round);
        // let query = wrap_query(create_round);
        // query.promise.then((evaluation) => {

        // });

        // return query;
    }
}