import { v4 as uuid } from "uuid";
import { supabase } from "src/lib/supabase";
import { Evaluation, Submission, User2 } from "src/gql/graphql";

export type FromGraphQL<T> = Omit<
  T,
  "nodeId" | "submissions" | "pollingMethod"
>;

export async function createEvaluation(
  evaluation: FromGraphQL<Evaluation>
): Promise<void | Error> {
  // TODO: do something if there are submissions
  let dbEvaluation: FromGraphQL<Evaluation> = {
    id: evaluation.id,
    name: evaluation.name,
    status: "draft",
  };

  const { error } = await supabase.from("evaluation").insert([dbEvaluation]);

  if (error) {
    return new Error(error.message);
  }
}

export async function deleteEvaluation({
  id,
}: {
  id: string;
}): Promise<void | Error> {
  let res = await supabase.from("evaluation").delete().eq("id", id);
}

export async function deleteSubmission(
  submission: Submission
): Promise<void | Error> {
  // TODO: some way of rolling back if one query fails
  let res = await supabase.from("submission").delete().eq("id", submission.id);
  res = await supabase
    .from("evaluation_submission")
    .delete()
    .eq("submission_id", submission.id);
}

export async function setEvaluationName(
  { id }: { id: string },
  name: string
): Promise<void | Error> {
  let res = await supabase
    .from("evaluation")
    .update({ name: name })
    .eq("id", id);
}

export async function setEvaluationStatus(
  { id }: { id: string },
  status: string
): Promise<void | Error> {
  let res = await supabase
    .from("evaluation")
    .update({ status: status })
    .eq("id", id);
}

export async function setSubmissionName(
  submission: Submission,
  name: string
): Promise<void | Error> {
  let res = await supabase
    .from("submission")
    .update({ name: name })
    .eq("id", submission.id);
}

export async function createEvaluationSubmission(
  evaluation: Evaluation,
  submission: FromGraphQL<Submission>
): Promise<void | Error> {
  let dbSubmission: FromGraphQL<Submission> = {
    id: submission.id,
    evaluation_id: evaluation.id,
    name: submission.name,
    user_id: submission.user2?.id,
    website_link: submission.website_link,
    description: submission.description,
    github_link: submission.github_link,
  };

  // TODO: some way of rolling back if one query fails
  let res = await supabase.from("submission").insert([dbSubmission]);

  if (res.error) {
    return new Error(res.error.message);
  }
}

export async function createUser(user: User2): Promise<void | Error> {
  let dbUser: FromGraphQL<User2> = {
    id: user.id,
    email: user.email,
    github_handle: user.github_handle,
    name: user.name,
  };

  let res = await supabase.from("user").insert([dbUser]);

  if (res.error) {
    return new Error(res.error.message);
  }
}
