export * as rpc from "./rpc";
import { v4 as uuid } from "uuid";

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
}

export interface Submission {
  id: string;
  user_id: string;
  name: string;
  github_link: string;
  website_link: string;
  evaluation_id: string;
  description: any;
}

export namespace Submission {
  export function init(params: Omit<Submission, "id">): Submission {
    return {
      ...params,
      id: uuid(),
    };
  }
}
