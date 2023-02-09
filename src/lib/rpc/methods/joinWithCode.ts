import { isAdmin, ServerParams } from "..";
import { Evaluator } from "../..";

type Params = {
  user_id: string;
  code: string;
  preferred_email: string;
};

export async function joinWithCode({ supabase, params }: ServerParams<Params>): Promise<Evaluator | Error> {
  // TODO: if user has already joined the round error, we should show which round it is that they tried to rejoin
  // TODO: errors raised in stored procedures are now caught in the error object? (causes a panic)
  const { data: new_evaluator, error } = await supabase.rpc("join_with_code", params).single();

  if (error) {
    console.error("Failed to join round", error, params);
    return new Error("Error: Please contact round administrator for support.");
  }

  if (!new_evaluator) {
    return new Error("Error: joinRoundWithCode returned no data");
  }

  return new_evaluator;
}
