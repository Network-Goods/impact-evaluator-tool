import { DocumentType } from "src/gql";
import { graphQLClient } from "src/lib/graphqlClient";
import { cleanPostgresGraphQLResult } from "src/lib/cleanPostgresGraphQLResult";
import create from "zustand";
import { DashboardEvaluationsQuery, EvaluationStubFragment } from "./queries";
import { createEvaluation, FromGraphQL } from "src/lib/dbUtils";
import { Evaluation } from "src/gql/graphql";
import { v4 as uuid } from "uuid";

export interface DashboardStore {
  fetching: boolean;
  error?: any;
  draftEvaluations: DocumentType<typeof EvaluationStubFragment>[];
  startedEvaluations: DocumentType<typeof EvaluationStubFragment>[];
  load: () => void;
  createEvaluation: () => Promise<FromGraphQL<Evaluation>>;
}

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  fetching: true,
  draftEvaluations: [],
  startedEvaluations: [],

  load: async () => {
    console.log("loading dashboard graphql");
    graphQLClient.request(DashboardEvaluationsQuery).then((data: any) => {
      cleanPostgresGraphQLResult(data);

      set({
        fetching: false,
        draftEvaluations: data.draftEvaluations || [],
        startedEvaluations: data.startedEvaluations || [],
      });
    });
  },

  createEvaluation: async (): Promise<FromGraphQL<Evaluation>> => {
    let newEvaluation: FromGraphQL<Evaluation> = {
      id: uuid(),
      name: "New Evaluation",
      status: "draft",
    };

    set({
      draftEvaluations: [...get().draftEvaluations, newEvaluation],
    });

    await createEvaluation(newEvaluation);
    return newEvaluation;
  },
}));
