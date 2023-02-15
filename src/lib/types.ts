import { v4 as uuid } from "uuid";

export interface AppError {
  error: string;
}

export function isError(obj: any): obj is AppError {
  if (obj === null) return false;
  return !!obj.error;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  github_handle: string;
  preferred_email?: string;
  github_user_id: string;
  role: string;
}

export interface Evaluation {
  id: string;
  name: string;
  status: string;
  description: string;
  start_time: string;
  end_time: string;
}

export interface DashboardEvaluation extends Evaluation {
  is_submitted: boolean;
}

export namespace Evaluation {
  export function init(): Evaluation {
    return {
      id: uuid(),
      name: "new evaluation",
      status: "draft",
      description: "",
      start_time: "",
      end_time: "",
    };
  }
}

export interface Evaluator {
  evaluation_id: string;
  user_id: string;
  voice_credits: number;
  id: string;
  is_submitted: boolean;
}

export interface Submission {
  id: string;
  user_id: string;
  name: string;
  github_link: string;
  evaluation_id: string;
  description: any;
  links: any;
}

export interface RoundStatus {
  name: string;
  num_evaluators: number;
  num_submitted: number;
  status: string;
}

export namespace Submission {
  export function init(params: Omit<Submission, "id">): Submission {
    return {
      ...params,
      id: uuid(),
    };
  }
}

export interface RoundDetailsData {
  submissions: Submission[];
}
