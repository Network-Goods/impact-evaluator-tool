import { getHeaders, graphQLClient, newClient } from "src/lib/graphqlClient";
import { cleanPostgresGraphQLResult } from "src/lib/cleanPostgresGraphQLResult";
import create from "zustand";
import { EvaluationQuery, SubmissionsQuery } from "./queries";
import { v4 as uuid } from "uuid";

import { Evaluation, Submission } from "src/gql/graphql";
import {
  createEvaluationSubmission,
  deleteEvaluation,
  FromGraphQL,
  setEvaluationName,
  setEvaluationStatus,
} from "src/lib/dbUtils";

export type LoadOptions = {
  with_submissions?: boolean;
  with_evaluators?: boolean;
};

export interface DetailsStore {
  fetching: boolean;
  error?: any;
  data?: any;
  evaluation?: Evaluation;
  submissions: FromGraphQL<Submission>[];
  load: (evaluation_id: string, options: LoadOptions) => void;
  setEvaluationName: (name: string) => void;
  setEvaluationStatus: (name: string) => void;
  deleteEvaluation: () => void;
  createSubmission: () => Promise<FromGraphQL<Submission> | Error>;
}

export const useEvaluationStore = create<DetailsStore>()((set, get) => ({
  fetching: true,
  submissions: [],
  load: (evaluation_id: string, loadOptions: LoadOptions) => {
    const variables = {
      evaluation_id: evaluation_id,
    };

    // Supabase GraphQL does not yet support directives, so we have to perform multiple requests when selectively loading data
    // https://github.com/supabase/pg_graphql/issues/125

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

        console.log(data);

        set({
          submissions: data.submissions as any,
          fetching: false,
          data: data,
        });
      });
    }
  },

  setEvaluationName: (name: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        name: name,
      },
    });

    setEvaluationName(evaluation, name);
  },

  setEvaluationStatus: (status: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        status,
      },
    });

    setEvaluationStatus(evaluation, status);
  },

  deleteEvaluation: () => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    deleteEvaluation(evaluation);
  },

  createSubmission: async (): Promise<Error | FromGraphQL<Submission>> => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    let newSubmission: FromGraphQL<Submission> = {
      description: "",
      evaluation_id: evaluation.id,
      id: uuid(),
      website_link: "",
      name: "",
      user_id: "",
    };

    set({
      submissions: [...get().submissions, newSubmission],
    });

    let res = await createEvaluationSubmission(evaluation, newSubmission);
    if (res instanceof Error) {
      return res;
    }

    return newSubmission;
  },
}));
