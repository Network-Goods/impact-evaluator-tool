import { createContext, useEffect, useState } from "react";
import { Evaluation } from "../../types";
import { QueryStatus, wrap_query, QueryResult, wrap_use_state, WrappedReactive } from "../../utils";
import { DashboardStore, get_rounds } from "./DashboardStore";


// export default function Dashboard() {
//     let store = new DashboardStore();
//     let notifications = new Notifications();

//     let c = { store, notifications }

//     let context = createContext(c);

//     return (<context.Provider value={c} >
//         {Dashboard2()}
//     </context.Provider>)
// }

export default function Dashboard() {
    let store = new DashboardStore();
    // let notifications = new Notifications();
    console.log('Dashboard called');

    useEffect(() => {
        store.load();
        // get_rounds().then(r => {
        //     set_rounds(r);
        //     console.log('gotten rounds: ', r);
        // })
    }, []);

    console.log('store value: ', store.rounds.value);
    // let rounds = wrap_query(get_rounds);


    return (
        <Dashboard2 store={store}  />
    )
}

export function Dashboard2({ store }:{ store: DashboardStore }) {

    console.log('Dashboard2 called');


    function create_round() {
        // let new_evaluation = store.create_round();
        // notifications.notify(QueryWrapper({ result: new_evaluation, mapper: () => (<div>Evaluation created</div>)}));
    }

    function show_rounds(evaluation: Evaluation) {
        return (
            <div key={evaluation.id}>{evaluation.title}</div>
        );
    }

    return (
        <div>
            {/* {notifications.render()} */}
            <button onClick={() => create_round()}>Create Round</button>
            {store.rounds.value.map(value => (<div>Evaluation created</div>))}
            {/* <QueryWrapper result={rounds} mapper={show_rounds}/> */}
        </div>
    )
}

class Notifications {
    notifications: WrappedReactive<JSX.Element[]>;

    constructor() {
        this.notifications = wrap_use_state<JSX.Element[]>([]);
    }

    notify(element: JSX.Element) {
        this.notifications.set_value([...this.notifications.value, element]);
    }

    render() {
        return (<div>
            {this.notifications.value.map((notification, i) => (<div key={i}>{notification}</div>))}
        </div>);
    }
}


type MapUnpacked<T, V> = T extends (infer U)[] ? (value: U) => V : (value: T) => V;

function QueryWrapper<T>({result, mapper }: { result: QueryResult<T> | QueryResult<T[]>, mapper: MapUnpacked<T, JSX.Element> } ) {
    if (result.status == QueryStatus.loading) {
        return (<div>Loading...</div>);
    } else if (result.status == QueryStatus.errored) {
        return (<div>Errored</div>);
    } else {
        if (Array.isArray(result.value)) {
            return (
                <div>
            {result.value.map(value => mapper(value))}
            </div>
        );
        } else {
            return (
                <div>
            {mapper(result.value)}
            </div>
            );
        }   
    }
}