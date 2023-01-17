import { graphQLClient } from "src/lib/graphqlClient";
import { cleanPostgresGraphQLResult } from "src/lib/cleanPostgresGraphQLResult";
import { create } from "zustand";
import { EvaluationQuery, SubmissionsQuery } from "./queries";
import { FromGraphQL } from "src/lib/dbUtils";
import { Evaluation, Submission } from "src/gql/graphql";

export type LoadOptions = {
  with_submissions?: boolean;
  with_evaluators?: boolean;
};

export interface SubmissionStore {
  fetching: boolean;
  error?: any;
  data?: any;
  evaluation?: Evaluation;
  submissions: FromGraphQL<Submission>[];
  load: (evaluation_id: string, options: LoadOptions) => void;
}

export const useSubmissionStore = create<SubmissionStore>()((set, get) => ({
  fetching: true,
  submissions: [],

  load: (evaluation_id: string, loadOptions: LoadOptions) => {
    const variables = {
      evaluation_id: evaluation_id,
    };
    graphQLClient.request(EvaluationQuery, variables).then((data) => {
      const evaluation: any = data.evaluation?.edges[0].node;
      if (!evaluation) {
        return;
      }

      set({
        evaluation: evaluation,
        fetching: false,
        data: data,
      });
    });
    if (loadOptions.with_submissions) {
      graphQLClient.request(SubmissionsQuery, variables).then((data) => {
        cleanPostgresGraphQLResult(data);

        set({
          submissions: data.submissions as any,
          fetching: false,
          data: data,
        });
      });
    }
  },
}));
