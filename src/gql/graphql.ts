/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars["BigInt"]>;
  gt?: InputMaybe<Scalars["BigInt"]>;
  gte?: InputMaybe<Scalars["BigInt"]>;
  in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lt?: InputMaybe<Scalars["BigInt"]>;
  lte?: InputMaybe<Scalars["BigInt"]>;
  neq?: InputMaybe<Scalars["BigInt"]>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars["Boolean"]>;
  gt?: InputMaybe<Scalars["Boolean"]>;
  gte?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<Scalars["Boolean"]>>;
  lt?: InputMaybe<Scalars["Boolean"]>;
  lte?: InputMaybe<Scalars["Boolean"]>;
  neq?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars["Date"]>;
  gt?: InputMaybe<Scalars["Date"]>;
  gte?: InputMaybe<Scalars["Date"]>;
  in?: InputMaybe<Array<Scalars["Date"]>>;
  lt?: InputMaybe<Scalars["Date"]>;
  lte?: InputMaybe<Scalars["Date"]>;
  neq?: InputMaybe<Scalars["Date"]>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars["Datetime"]>;
  gt?: InputMaybe<Scalars["Datetime"]>;
  gte?: InputMaybe<Scalars["Datetime"]>;
  in?: InputMaybe<Array<Scalars["Datetime"]>>;
  lt?: InputMaybe<Scalars["Datetime"]>;
  lte?: InputMaybe<Scalars["Datetime"]>;
  neq?: InputMaybe<Scalars["Datetime"]>;
};

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<Scalars["Float"]>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  neq?: InputMaybe<Scalars["Float"]>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars["ID"]>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  neq?: InputMaybe<Scalars["Int"]>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: "Mutation";
  /** Deletes zero or more records from the `evaluation` collection */
  deleteFromevaluationCollection: EvaluationDeleteResponse;
  /** Deletes zero or more records from the `evaluator` collection */
  deleteFromevaluatorCollection: EvaluatorDeleteResponse;
  /** Deletes zero or more records from the `submission` collection */
  deleteFromsubmissionCollection: SubmissionDeleteResponse;
  /** Deletes zero or more records from the `user` collection */
  deleteFromuserCollection: UserDeleteResponse;
  /** Adds one or more `evaluation` records to the collection */
  insertIntoevaluationCollection?: Maybe<EvaluationInsertResponse>;
  /** Adds one or more `evaluator` records to the collection */
  insertIntoevaluatorCollection?: Maybe<EvaluatorInsertResponse>;
  /** Adds one or more `submission` records to the collection */
  insertIntosubmissionCollection?: Maybe<SubmissionInsertResponse>;
  /** Adds one or more `user` records to the collection */
  insertIntouserCollection?: Maybe<UserInsertResponse>;
  /** Updates zero or more records in the `evaluation` collection */
  updateevaluationCollection: EvaluationUpdateResponse;
  /** Updates zero or more records in the `evaluator` collection */
  updateevaluatorCollection: EvaluatorUpdateResponse;
  /** Updates zero or more records in the `submission` collection */
  updatesubmissionCollection: SubmissionUpdateResponse;
  /** Updates zero or more records in the `user` collection */
  updateuserCollection: UserUpdateResponse;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromevaluationCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<EvaluationFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromevaluatorCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<EvaluatorFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromsubmissionCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<SubmissionFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromuserCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<UserFilter>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoevaluationCollectionArgs = {
  objects: Array<EvaluationInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoevaluatorCollectionArgs = {
  objects: Array<EvaluatorInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntosubmissionCollectionArgs = {
  objects: Array<SubmissionInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntouserCollectionArgs = {
  objects: Array<UserInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationUpdateevaluationCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<EvaluationFilter>;
  set: EvaluationUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateevaluatorCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<EvaluatorFilter>;
  set: EvaluatorUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatesubmissionCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<SubmissionFilter>;
  set: SubmissionUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateuserCollectionArgs = {
  atMost?: Scalars["Int"];
  filter?: InputMaybe<UserFilter>;
  set: UserUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars["ID"];
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = "AscNullsFirst",
  /** Ascending order, nulls last */
  AscNullsLast = "AscNullsLast",
  /** Descending order, nulls first */
  DescNullsFirst = "DescNullsFirst",
  /** Descending order, nulls last */
  DescNullsLast = "DescNullsLast",
}

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
};

/** The root type for querying data */
export type Query = {
  __typename?: "Query";
  /** A pagable collection of type `evaluation` */
  evaluationCollection?: Maybe<EvaluationConnection>;
  /** A pagable collection of type `evaluator` */
  evaluatorCollection?: Maybe<EvaluatorConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `submission` */
  submissionCollection?: Maybe<SubmissionConnection>;
  /** A pagable collection of type `user` */
  userCollection?: Maybe<UserConnection>;
};

/** The root type for querying data */
export type QueryEvaluationCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<EvaluationFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<EvaluationOrderBy>>;
};

/** The root type for querying data */
export type QueryEvaluatorCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<EvaluatorFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<EvaluatorOrderBy>>;
};

/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars["ID"];
};

/** The root type for querying data */
export type QuerySubmissionCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<SubmissionFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<SubmissionOrderBy>>;
};

/** The root type for querying data */
export type QueryUserCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  neq?: InputMaybe<Scalars["String"]>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars["Time"]>;
  gt?: InputMaybe<Scalars["Time"]>;
  gte?: InputMaybe<Scalars["Time"]>;
  in?: InputMaybe<Array<Scalars["Time"]>>;
  lt?: InputMaybe<Scalars["Time"]>;
  lte?: InputMaybe<Scalars["Time"]>;
  neq?: InputMaybe<Scalars["Time"]>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars["UUID"]>;
  in?: InputMaybe<Array<Scalars["UUID"]>>;
  neq?: InputMaybe<Scalars["UUID"]>;
};

export type Evaluation = Node & {
  __typename?: "evaluation";
  description?: Maybe<Scalars["String"]>;
  evaluatorCollection?: Maybe<EvaluatorConnection>;
  id: Scalars["UUID"];
  name: Scalars["String"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"];
  status: Scalars["String"];
  submissionCollection?: Maybe<SubmissionConnection>;
};

export type EvaluationEvaluatorCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<EvaluatorFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<EvaluatorOrderBy>>;
};

export type EvaluationSubmissionCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<SubmissionFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<SubmissionOrderBy>>;
};

export type EvaluationConnection = {
  __typename?: "evaluationConnection";
  edges: Array<EvaluationEdge>;
  pageInfo: PageInfo;
};

export type EvaluationDeleteResponse = {
  __typename?: "evaluationDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Evaluation>;
};

export type EvaluationEdge = {
  __typename?: "evaluationEdge";
  cursor: Scalars["String"];
  node: Evaluation;
};

export type EvaluationFilter = {
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  status?: InputMaybe<StringFilter>;
};

export type EvaluationInsertInput = {
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  name?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type EvaluationInsertResponse = {
  __typename?: "evaluationInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Evaluation>;
};

export type EvaluationOrderBy = {
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
};

export type EvaluationUpdateInput = {
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  name?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type EvaluationUpdateResponse = {
  __typename?: "evaluationUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Evaluation>;
};

export type Evaluator = Node & {
  __typename?: "evaluator";
  evaluation?: Maybe<Evaluation>;
  evaluation_id: Scalars["UUID"];
  id: Scalars["UUID"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"];
  user?: Maybe<User>;
  user_id: Scalars["UUID"];
  voice_credits?: Maybe<Scalars["Int"]>;
};

export type EvaluatorConnection = {
  __typename?: "evaluatorConnection";
  edges: Array<EvaluatorEdge>;
  pageInfo: PageInfo;
};

export type EvaluatorDeleteResponse = {
  __typename?: "evaluatorDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Evaluator>;
};

export type EvaluatorEdge = {
  __typename?: "evaluatorEdge";
  cursor: Scalars["String"];
  node: Evaluator;
};

export type EvaluatorFilter = {
  evaluation_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  user_id?: InputMaybe<UuidFilter>;
  voice_credits?: InputMaybe<IntFilter>;
};

export type EvaluatorInsertInput = {
  evaluation_id?: InputMaybe<Scalars["UUID"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  user_id?: InputMaybe<Scalars["UUID"]>;
  voice_credits?: InputMaybe<Scalars["Int"]>;
};

export type EvaluatorInsertResponse = {
  __typename?: "evaluatorInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Evaluator>;
};

export type EvaluatorOrderBy = {
  evaluation_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
  voice_credits?: InputMaybe<OrderByDirection>;
};

export type EvaluatorUpdateInput = {
  evaluation_id?: InputMaybe<Scalars["UUID"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  user_id?: InputMaybe<Scalars["UUID"]>;
  voice_credits?: InputMaybe<Scalars["Int"]>;
};

export type EvaluatorUpdateResponse = {
  __typename?: "evaluatorUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Evaluator>;
};

export type Submission = Node & {
  __typename?: "submission";
  description: Scalars["String"];
  evaluation?: Maybe<Evaluation>;
  evaluation_id: Scalars["UUID"];
  github_link?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  name: Scalars["String"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"];
  user?: Maybe<User>;
  user_id: Scalars["UUID"];
  website_link: Scalars["String"];
};

export type SubmissionConnection = {
  __typename?: "submissionConnection";
  edges: Array<SubmissionEdge>;
  pageInfo: PageInfo;
};

export type SubmissionDeleteResponse = {
  __typename?: "submissionDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Submission>;
};

export type SubmissionEdge = {
  __typename?: "submissionEdge";
  cursor: Scalars["String"];
  node: Submission;
};

export type SubmissionFilter = {
  description?: InputMaybe<StringFilter>;
  evaluation_id?: InputMaybe<UuidFilter>;
  github_link?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  user_id?: InputMaybe<UuidFilter>;
  website_link?: InputMaybe<StringFilter>;
};

export type SubmissionInsertInput = {
  description?: InputMaybe<Scalars["String"]>;
  evaluation_id?: InputMaybe<Scalars["UUID"]>;
  github_link?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  name?: InputMaybe<Scalars["String"]>;
  user_id?: InputMaybe<Scalars["UUID"]>;
  website_link?: InputMaybe<Scalars["String"]>;
};

export type SubmissionInsertResponse = {
  __typename?: "submissionInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Submission>;
};

export type SubmissionOrderBy = {
  description?: InputMaybe<OrderByDirection>;
  evaluation_id?: InputMaybe<OrderByDirection>;
  github_link?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
  website_link?: InputMaybe<OrderByDirection>;
};

export type SubmissionUpdateInput = {
  description?: InputMaybe<Scalars["String"]>;
  evaluation_id?: InputMaybe<Scalars["UUID"]>;
  github_link?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  name?: InputMaybe<Scalars["String"]>;
  user_id?: InputMaybe<Scalars["UUID"]>;
  website_link?: InputMaybe<Scalars["String"]>;
};

export type SubmissionUpdateResponse = {
  __typename?: "submissionUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<Submission>;
};

export type User = Node & {
  __typename?: "user";
  email?: Maybe<Scalars["String"]>;
  evaluatorCollection?: Maybe<EvaluatorConnection>;
  github_handle?: Maybe<Scalars["String"]>;
  github_user_id?: Maybe<Scalars["UUID"]>;
  id: Scalars["UUID"];
  invite_status?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"];
  preferred_email?: Maybe<Scalars["UUID"]>;
  submissionCollection?: Maybe<SubmissionConnection>;
};

export type UserEvaluatorCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<EvaluatorFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<EvaluatorOrderBy>>;
};

export type UserSubmissionCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]>;
  before?: InputMaybe<Scalars["Cursor"]>;
  filter?: InputMaybe<SubmissionFilter>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Array<SubmissionOrderBy>>;
};

export type UserConnection = {
  __typename?: "userConnection";
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserDeleteResponse = {
  __typename?: "userDeleteResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type UserEdge = {
  __typename?: "userEdge";
  cursor: Scalars["String"];
  node: User;
};

export type UserFilter = {
  email?: InputMaybe<StringFilter>;
  github_handle?: InputMaybe<StringFilter>;
  github_user_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  invite_status?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  preferred_email?: InputMaybe<UuidFilter>;
};

export type UserInsertInput = {
  email?: InputMaybe<Scalars["String"]>;
  github_handle?: InputMaybe<Scalars["String"]>;
  github_user_id?: InputMaybe<Scalars["UUID"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  invite_status?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  preferred_email?: InputMaybe<Scalars["UUID"]>;
};

export type UserInsertResponse = {
  __typename?: "userInsertResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type UserOrderBy = {
  email?: InputMaybe<OrderByDirection>;
  github_handle?: InputMaybe<OrderByDirection>;
  github_user_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  invite_status?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  preferred_email?: InputMaybe<OrderByDirection>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars["String"]>;
  github_handle?: InputMaybe<Scalars["String"]>;
  github_user_id?: InputMaybe<Scalars["UUID"]>;
  id?: InputMaybe<Scalars["UUID"]>;
  invite_status?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  preferred_email?: InputMaybe<Scalars["UUID"]>;
};

export type UserUpdateResponse = {
  __typename?: "userUpdateResponse";
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type DashboardEvaluationsQueryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type DashboardEvaluationsQueryQuery = {
  __typename?: "Query";
  evaluations?: {
    __typename?: "evaluationConnection";
    edges: Array<{
      __typename?: "evaluationEdge";
      node: {
        __typename?: "evaluation";
        id: any;
        name: string;
        status: string;
      };
    }>;
  } | null;
};

export type EvaluationStubFragmentFragment = {
  __typename?: "evaluation";
  id: any;
  name: string;
  status: string;
};

export type EvaluationQueryQueryVariables = Exact<{
  evaluation_id: Scalars["UUID"];
}>;

export type EvaluationQueryQuery = {
  __typename?: "Query";
  evaluation?: {
    __typename?: "evaluationConnection";
    edges: Array<{
      __typename?: "evaluationEdge";
      node: {
        __typename?: "evaluation";
        id: any;
        name: string;
        status: string;
      };
    }>;
  } | null;
};

export type SubmissionsQueryQueryVariables = Exact<{
  evaluation_id: Scalars["UUID"];
}>;

export type SubmissionsQueryQuery = {
  __typename?: "Query";
  submissions?: {
    __typename?: "submissionConnection";
    edges: Array<{
      __typename?: "submissionEdge";
      node: { __typename?: "submission"; id: any; name: string };
    }>;
  } | null;
};

export type UserProfileQueryQueryVariables = Exact<{
  github_user_id: Scalars["UUID"];
}>;

export type UserProfileQueryQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "userConnection";
    edges: Array<{
      __typename?: "userEdge";
      node: { __typename?: "user"; id: any; preferred_email?: any | null };
    }>;
  } | null;
};

export const EvaluationStubFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EvaluationStubFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EvaluationStubFragmentFragment, unknown>;
export const DashboardEvaluationsQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "DashboardEvaluationsQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "evaluations" },
            name: { kind: "Name", value: "evaluationCollection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "EvaluationStubFragment",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...EvaluationStubFragmentFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  DashboardEvaluationsQueryQuery,
  DashboardEvaluationsQueryQueryVariables
>;
export const EvaluationQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EvaluationQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "evaluation_id" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "evaluation" },
            name: { kind: "Name", value: "evaluationCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "evaluation_id" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "status" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EvaluationQueryQuery,
  EvaluationQueryQueryVariables
>;
export const SubmissionsQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SubmissionsQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "evaluation_id" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "submissions" },
            name: { kind: "Name", value: "submissionCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "evaluation_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "evaluation_id" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubmissionsQueryQuery,
  SubmissionsQueryQueryVariables
>;
export const UserProfileQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserProfileQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "github_user_id" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "user" },
            name: { kind: "Name", value: "userCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "github_user_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "github_user_id" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "preferred_email" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserProfileQueryQuery,
  UserProfileQueryQueryVariables
>;
