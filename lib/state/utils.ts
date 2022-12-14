import { Dispatch, SetStateAction, useState } from "react";


export type EvaluationStatus = 'draft' | 'inprogress' | 'complete';

export interface WrappedReactive<T> {
    value: T,
    set_value: Dispatch<SetStateAction<T>>,
}

export function wrap_use_state<T>(initial: T): WrappedReactive<T> {
    let [value, set_value] = useState<T>(initial);

    return {
        value: value,
        set_value: set_value,
    }
}