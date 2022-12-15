import { createContext, useContext } from "react";
import { NextRouter, useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import {
  is_error,
  new_query_error,
  QueryError,
  QueryResult,
  use_query,
} from "../../utils";
import { supabase } from "../../supabase";
import {
  NotificationContext,
  NotificationStore,
} from "../../utils/Notifications";
import { Evaluation } from "../../types";

export async function get_rounds(): Promise<Evaluation[] | QueryError> {
  const { data, error } = await supabase.from("evaluation").select();
  if (error) {
    return new_query_error(error);
  }

  return data as any;
}

export async function create_round(): Promise<Evaluation | QueryError> {
  let new_evaluation: Evaluation = {
    id: uuid(),
    title: "Untitled Evaluation",
    status: "draft",
    kind: "undefined",
  };

  const { error } = await supabase.from("evaluation").insert([new_evaluation]);

  if (error) {
    return new_query_error(error);
  }

  return new_evaluation;
}

export class DashboardStore {
  rounds: QueryResult<Evaluation[]>;
  notification_store: NotificationStore;
  router: NextRouter;

  constructor() {
    this.rounds = use_query<Evaluation[]>(get_rounds);
    this.notification_store = useContext(NotificationContext);
    this.router = useRouter();
  }

  load() {
    this.rounds.run();
  }

  create_round(): Promise<void> {
    let notification_id = this.notification_store.notify(
      <div>Adding Evaluation</div>
    );

    let query = create_round().then((evaluation) => {
      if (is_error(evaluation)) {
        console.error(
          "DashboardStore.create_round failed: ",
          evaluation.message
        );
        this.notification_store.update_notification(
          notification_id,
          <div>Failed to add Evaluation</div>
        );
      } else {
        this.notification_store.clear_notification(notification_id);
        this.router.push(`/admin/evaluation/${evaluation.id}`);
      }
    });

    return query;
  }
}

export const DashboardContext = createContext<DashboardStore>({} as any);
