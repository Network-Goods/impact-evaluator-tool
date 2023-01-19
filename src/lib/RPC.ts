import axios from "axios";

type Definition = {
  get_evaluations_auth: {
    params: { user_id: string };
    result: void;
  };
  // setVote: {
  //   params: { evaluation_id: string; evaluator_id: string };
  //   result: void;
  // };
};

export type Method = keyof Definition;
export type Param<T extends Method> = Definition[T]["params"];
export type Result<T extends Method> = Definition[T]["result"];

export async function rpc<M extends Method>(
  method: M,
  params: Param<M>
): Promise<Result<M>> {
  const res = await axios.post("/api/rpc", {
    method: method,
    params: params,
  });

  return res.data.result as any;
}
