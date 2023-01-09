import { gql } from "src/gql";

export const DashboardEvaluationsQuery = gql(/* GraphQL */ `
  query DashboardEvaluationsQuery {
    draftEvaluations: evaluationCollection(
      filter: { status: { eq: "draft" } }
    ) {
      ...evaluationStubs
    }
    startedEvaluations: evaluationCollection(
      filter: { status: { eq: "started" } }
    ) {
      ...evaluationStubs
    }
    closedEvaluations: evaluationCollection(
      filter: { status: { eq: "closed" } }
    ) {
      ...evaluationStubs
    }
  }

  fragment evaluationStubs on evaluationConnection {
    edges {
      node {
        ...EvaluationStubFragment
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
