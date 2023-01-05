export interface Evaluation {
  id: string;
  title: string;
  kind: "undefined" | "quadratic-voting" | "quantitative-evaluation";
  status: "draft" | "started" | "closed";
}

export interface Evaluator {
  id: string;
  user_id: string;
  evaluation_id: string;
}
