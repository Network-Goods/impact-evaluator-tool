import { gql } from "src/gql";

export const DashboardEvaluationsQuery = gql(/* GraphQL */ `
  query DashboardEvaluationsQuery {
    evaluations: evaluationCollection {
      edges {
        node {
          ...EvaluationStubFragment
        }
      }
    }
  }
`);

export const EvaluationStubFragment = gql(/* GraphQL */ `
  fragment EvaluationStubFragment on evaluation {
    id
    name
    status
  }
`);
