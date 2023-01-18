import { DocumentType } from "src/gql";
import { graphQLClient } from "src/lib/graphqlClient";
import { cleanPostgresGraphQLResult } from "src/lib/cleanPostgresGraphQLResult";
import create from "zustand";
import { DashboardEvaluationsQuery, EvaluationStubFragment } from "./queries";
import { createEvaluation, FromGraphQL } from "src/lib/dbUtils";
import { Evaluation } from "src/gql/graphql";
import { v4 as uuid } from "uuid";
import { SupabaseClient } from "@supabase/supabase-js";
import { rpc } from "src/lib/RPC";

async function fetchEvaluations(supabase: SupabaseClient, user_id: string) {
  // let { data, error } = await supabase.rpc("get_user_evaluations2", {
  //   in_user_id: user_id,
  // });

  const res = await rpc("get_evaluations_auth", { user_id: user_id });
  console.log("rpc res", res);

  // if (error) {
  //   console.error("Failed to fetch evaluations", error);
  //   return null;
  // }

  // console.log("fetchEvaluations data", data);
  return res as any;
}

export interface DashboardStore {
  fetching: boolean;
  error?: any;
  evaluations: FromGraphQL<Evaluation>[];
  load: (supabase: SupabaseClient, user_id: string) => void;
  createEvaluation: (
    supabase: SupabaseClient
  ) => Promise<FromGraphQL<Evaluation>>;
}

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  fetching: true,
  evaluations: [],

  load: async (supabase: SupabaseClient, user_id: string) => {
    // graphQLClient.request(DashboardEvaluationsQuery).then((data: any) => {
    //   cleanPostgresGraphQLResult(data);
    fetchEvaluations(supabase, user_id).then((data: any) => {
      if (!data) {
        return;
      }

      console.log("graph data", data);

      set({
        fetching: false,
        evaluations: data || [],
      });
    });
  },

  createEvaluation: async (
    supabase: SupabaseClient
  ): Promise<FromGraphQL<Evaluation>> => {
    let newEvaluation: FromGraphQL<Evaluation> = {
      id: uuid(),
      name: "New Evaluation",
      status: "draft",
    };

    set({
      evaluations: [...get().evaluations, newEvaluation],
    });

    await createEvaluation(supabase, newEvaluation);
    return newEvaluation;
  },
}));
