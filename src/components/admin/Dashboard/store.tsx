import { DocumentType } from "src/gql";
import { graphQLClient } from "src/lib/graphqlClient";
import { cleanPostgresGraphQLResult } from "src/lib/cleanPostgresGraphQLResult";
import create from "zustand";
import { DashboardEvaluationsQuery, EvaluationStubFragment } from "./queries";
import { createEvaluation, FromGraphQL } from "src/lib/dbUtils";
import { Evaluation } from "src/gql/graphql";
import { v4 as uuid } from "uuid";
import { SupabaseClient } from "@supabase/supabase-js";

export interface DashboardStore {
  fetching: boolean;
  error?: any;
  evaluations: FromGraphQL<Evaluation>[];
  load: () => void;
  createEvaluation: (
    supabase: SupabaseClient
  ) => Promise<FromGraphQL<Evaluation>>;
}

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  fetching: true,
  evaluations: [],

  load: async () => {
    graphQLClient.request(DashboardEvaluationsQuery).then((data: any) => {
      cleanPostgresGraphQLResult(data);

      set({
        fetching: false,
        evaluations: data.evaluations || [],
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
