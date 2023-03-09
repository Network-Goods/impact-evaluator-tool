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
  start_time: string | null;
  end_time: string | null;
  form_description: string;
}

export interface DashboardEvaluation extends Evaluation {
  is_submitted: boolean;
}

export namespace Evaluation {
  export function init(): Evaluation {
    return {
      id: uuid(),
      name: "",
      status: "draft",
      description: "",
      start_time: null,
      end_time: null,
      form_description: "",
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
  user_id?: string;
  name: string;
  github_link: string;
  github_handle: string;
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

export interface RoundDetailsData extends Submission {
  user: { github_handle: string };
}

export interface SubmissionFormInputs {
  name: string;
  evaluation_field: SubmissionFormFieldInputs[];
  description: string;
  summary: string;
  specs: string;
  github_link: string;
  links?: SubmissionFormLinkInputs[];
  githubHandle: string;
  user_id?: string;
}

export interface SubmissionFormLinkInputs {
  name: string;
  value: string;
}
export interface SubmissionFormFieldInputs {
  id: string;
  evaluation_id: string;
  heading: string;
  subheading: string;
  char_count: number;
  submission_field: SubmissionFormFieldBodyInputs[];
}
export interface SubmissionFormFieldBodyInputs {
  id: string;
  field_body: string;
  fields_id: string;
  submission_id: string;
}
