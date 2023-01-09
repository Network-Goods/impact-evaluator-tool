/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  '\n  query DashboardEvaluationsQuery {\n    draftEvaluations: evaluationCollection(\n      filter: { status: { eq: "draft" } }\n    ) {\n      ...evaluationStubs\n    }\n    startedEvaluations: evaluationCollection(\n      filter: { status: { eq: "started" } }\n    ) {\n      ...evaluationStubs\n    }\n    closedEvaluations: evaluationCollection(\n      filter: { status: { eq: "closed" } }\n    ) {\n      ...evaluationStubs\n    }\n  }\n\n  fragment evaluationStubs on evaluationConnection {\n    edges {\n      node {\n        ...EvaluationStubFragment\n      }\n    }\n  }\n':
    types.DashboardEvaluationsQueryDocument,
  "\n  fragment EvaluationStubFragment on evaluation {\n    id\n    name\n    status\n  }\n":
    types.EvaluationStubFragmentFragmentDoc,
  "\n  query EvaluationQuery($evaluation_id: UUID!) {\n    evaluation: evaluationCollection(filter: { id: { eq: $evaluation_id } }) {\n      edges {\n        node {\n          id\n          name\n          status\n        }\n      }\n    }\n  }\n":
    types.EvaluationQueryDocument,
  "\n  query SubmissionsQuery($evaluation_id: UUID!) {\n    submissions: submissionCollection(\n      filter: { evaluation_id: { eq: $evaluation_id } }\n    ) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n":
    types.SubmissionsQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 **/
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query DashboardEvaluationsQuery {\n    draftEvaluations: evaluationCollection(\n      filter: { status: { eq: "draft" } }\n    ) {\n      ...evaluationStubs\n    }\n    startedEvaluations: evaluationCollection(\n      filter: { status: { eq: "started" } }\n    ) {\n      ...evaluationStubs\n    }\n    closedEvaluations: evaluationCollection(\n      filter: { status: { eq: "closed" } }\n    ) {\n      ...evaluationStubs\n    }\n  }\n\n  fragment evaluationStubs on evaluationConnection {\n    edges {\n      node {\n        ...EvaluationStubFragment\n      }\n    }\n  }\n'
): (typeof documents)['\n  query DashboardEvaluationsQuery {\n    draftEvaluations: evaluationCollection(\n      filter: { status: { eq: "draft" } }\n    ) {\n      ...evaluationStubs\n    }\n    startedEvaluations: evaluationCollection(\n      filter: { status: { eq: "started" } }\n    ) {\n      ...evaluationStubs\n    }\n    closedEvaluations: evaluationCollection(\n      filter: { status: { eq: "closed" } }\n    ) {\n      ...evaluationStubs\n    }\n  }\n\n  fragment evaluationStubs on evaluationConnection {\n    edges {\n      node {\n        ...EvaluationStubFragment\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment EvaluationStubFragment on evaluation {\n    id\n    name\n    status\n  }\n"
): (typeof documents)["\n  fragment EvaluationStubFragment on evaluation {\n    id\n    name\n    status\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query EvaluationQuery($evaluation_id: UUID!) {\n    evaluation: evaluationCollection(filter: { id: { eq: $evaluation_id } }) {\n      edges {\n        node {\n          id\n          name\n          status\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query EvaluationQuery($evaluation_id: UUID!) {\n    evaluation: evaluationCollection(filter: { id: { eq: $evaluation_id } }) {\n      edges {\n        node {\n          id\n          name\n          status\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SubmissionsQuery($evaluation_id: UUID!) {\n    submissions: submissionCollection(\n      filter: { evaluation_id: { eq: $evaluation_id } }\n    ) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query SubmissionsQuery($evaluation_id: UUID!) {\n    submissions: submissionCollection(\n      filter: { evaluation_id: { eq: $evaluation_id } }\n    ) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
