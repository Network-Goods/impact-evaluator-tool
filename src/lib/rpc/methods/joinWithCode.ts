import { isAdmin, ServerParams } from "..";
import { Submission, AppError } from "../..";

type Params = {
  user_id: string;
  code: string;
  preferred_email: string;
};

type Return = {
  evaluationID: string;
  submission: Submission;
};

export async function joinWithCode({ supabase, params }: ServerParams<Params>): Promise<Return | AppError> {
  // TODO: if user has already joined the round error, we should show which round it is that they tried to rejoin
  // TODO: errors raised in stored procedures are now caught in the error object? (causes a panic)
  const { data, error } = await supabase.rpc("join_with_code", params).single();
  // const newEvaluator: Evaluator | AppError = data;

  if (error) {
    console.error("Failed to join round", error, params);
    return {
      error: "Error: Please contact round administrator for support.",
    };
  }

  // if (!newEvaluator) {
  //   return {
  //     error: "Error: joinRoundWithCode returned no data",
  //   };
  // }

  return <any>data;
}
