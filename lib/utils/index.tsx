import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";

export * from "./Query";

export interface QueryError {
  is_error: true;
  message: string;
}

export function is_error(obj: any): obj is QueryError {
  return obj.is_error || obj.error;
}

export function new_query_error(error: PostgrestError): QueryError {
  return {
    is_error: true,
    message: error.message,
  };
}
