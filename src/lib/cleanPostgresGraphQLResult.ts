export function cleanPostgresGraphQLResult(result: any): any {
  for (let key of Object.keys(result)) {
    if (result[key]["edges"] && Array.isArray(result[key]["edges"])) {
      result[key] = result[key]["edges"].map((node: any) => node.node);
    }

    if (Array.isArray(result[key])) {
      for (let item of result[key]) {
        cleanPostgresGraphQLResult(item);
      }
    } else if (typeof result[key] === "object") {
      cleanPostgresGraphQLResult(result[key]);
    }
  }
}
