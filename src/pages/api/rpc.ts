import {
  createServerSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { RPC } from "src/lib";
// import type { Database } from "types_db";
import axios from "axios";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const supabaseServerClient = createServerSupabaseClient<any>({
    req,
    res,
  });

  const {
    data: { user },
  } = (await supabaseServerClient.auth.getUser()) as any;
  const user_id = user.id;

  let role = await getUserRole(supabaseServerClient, user_id);
  let uid = await getUserID(supabaseServerClient, user_id);

  let result = await dispatchRPC(
    supabaseServerClient,
    uid,
    role,
    req.body.method,
    req.body.params
  );

  console.log("rpc resul ", result);

  res.status(200).json({
    result: result,
  });
};

async function dispatchRPC<M extends RPC.Method>(
  supabase: SupabaseClient,
  user_id: string,
  role: string,
  method: M,
  params: RPC.Param<M>
): Promise<RPC.Result<M>> {
  switch (method) {
    // case "getEvaluation":
    //   return getEvaluation(supabase, user_id, role, params);
    case "getEvaluationStubs":
      return getEvaluationStubs(supabase, user_id, role, params);
  }
}
// EvaluatorsFirstCode;
async function getEvaluationStubs(
  supabase: SupabaseClient,
  user_id: string,
  role: string,
  params: RPC.Param<"getEvaluationStubs">
): Promise<RPC.Result<"getEvaluationStubs">> {
  // supabase.from('evaluation').select().in()
  let { data, error } = await supabase.rpc("get_user_evaluations", {
    in_user_id: user_id,
  });

  console.log("server data", data, user_id);

  return (data as any) || [];
}

// function getEvaluation(
//   supabase: SupabaseClient,
//   user_id: string,
//   role: string,
//   params: RPC.Param<"getEvaluation">
// ): RPC.Result<"getEvaluation"> {}

async function getUserRole(
  supabase: SupabaseClient,
  userID: string
): Promise<string> {
  const { data, error } = await supabase
    .from("user")
    .select("role")
    .eq("id", userID)
    .single();

  if (error) {
    return "user";
  }

  return data.role;
}

async function getUserID(
  supabase: SupabaseClient,
  userID: string
): Promise<string> {
  const { data, error } = await supabase
    .from("user")
    .select("id")
    .eq("github_user_id", userID)
    .single();

  if (error) {
    return "user";
  }

  return data.id;
}
