import { request, GraphQLClient } from "graphql-request";

export function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };
  // const authorization = supabaseClient.auth.session()?.access_token;

  // if (authorization) {
  //   headers["authorization"] = `Bearer ${authorization}`;
  // }

  return headers;
}

export function newClient() {
  return new GraphQLClient(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/graphql/v1`,
    { headers: getHeaders() }
  );
}

export const graphQLClient = newClient();
