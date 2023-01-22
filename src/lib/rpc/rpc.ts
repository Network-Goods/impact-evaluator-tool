import axios from "axios";
import { SupabaseClient } from "@supabase/supabase-js";
import { Auth, ServerParams } from ".";
import { MethodLookup } from "./MethodLookup";

type Lookup = typeof MethodLookup;
type Method = keyof Lookup;
type MethodParams<T extends Method> = Parameters<Lookup[T]>[0]["params"];

// The following will not work with typescript:
//  type MethodReturn<T extends Method> = ReturnType<Lookup[T]>
// To make typescript happy we have to convince it that the method return type will always
// be a promise. To achieve this we first must unpack the awaited return type (the type wrapped by the returned promise),
// then wrap the awaited return type in a promise. The unpacking guarantees that we are not
// accidentally wrapping a promise with another promise.
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type PromisedMethodReturn<T extends Method> = Awaited<ReturnType<Lookup[T]>>;
type MethodReturn<T extends Method> = Promise<PromisedMethodReturn<T>>;

export async function call<M extends Method>(method: M, params: MethodParams<M>): MethodReturn<M> {
  const res = await axios.post("/api/rpc", {
    method: method,
    params: params,
  });

  if (res.data.error) {
    return new Error(res.data.error) as any;
  }

  return res.data.result as any;
}

export async function execute<M extends Method>(
  method: M,
  params: MethodParams<M>,
  supabase: SupabaseClient,
  auth: Auth,
): MethodReturn<M> {
  const serverParams: ServerParams<MethodParams<M>> = {
    params,
    supabase,
    auth,
  };

  const res = MethodLookup[method](serverParams as any);
  return res as any;
}
