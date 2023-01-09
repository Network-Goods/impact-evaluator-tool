import { DocumentType, gql } from "src/gql";

export const EvaluationQuery = gql(/* GraphQL */ `
  query EvaluationQuery($evaluation_id: UUID!) {
    evaluation: evaluationCollection(filter: { id: { eq: $evaluation_id } }) {
      edges {
        node {
          id
          name
          status
        }
      }
    }
  }
`);

export const SubmissionsQuery = gql(/* GraphQL */ `
  query SubmissionsQuery($evaluation_id: UUID!) {
    submissions: submissionCollection(
      filter: { evaluation_id: { eq: $evaluation_id } }
    ) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);
