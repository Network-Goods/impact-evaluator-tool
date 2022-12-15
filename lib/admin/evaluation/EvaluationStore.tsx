import { NextRouter, useRouter } from "next/router";
import { useContext } from "react";
import { supabase } from "../../supabase";
import { Evaluation, Evaluator } from "../../types";
import {
  new_query_error,
  QueryError,
  QueryResult,
  use_query,
} from "../../utils";
import {
  NotificationContext,
  NotificationStore,
} from "../../utils/Notifications";

async function get_evaluation(
  evaluation_id: string
): Promise<Evaluation | QueryError> {
  const { data, error } = await supabase
    .from("evaluation")
    .select()
    .eq("id", evaluation_id)
    .single();

  if (error) {
    return new_query_error(error);
  }

  return data as any;
}

async function get_evaluators(
  evaluation_id: string
): Promise<Evaluator[] | QueryError> {
  const { data, error } = await supabase
    .from("evaluator")
    .select()
    .eq("evaluation_id", evaluation_id);

  if (error) {
    return new_query_error(error);
  }

  return data as any;
}

export class EvaluatieonStore {
  notification_store: NotificationStore;
  router: NextRouter;

  evaluation: QueryResult<Evaluation>;
  evaluators: QueryResult<Evaluator[]>;

  constructor(evaluation_id: string) {
    this.notification_store = useContext(NotificationContext);
    this.router = useRouter();

    this.evaluation = use_query<Evaluation>(() =>
      get_evaluation(evaluation_id)
    );
    this.evaluators = use_query<Evaluator[]>(() =>
      get_evaluators(evaluation_id)
    );
  }
}
