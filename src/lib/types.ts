import { v4 as uuid } from "uuid";
import { Submission as submission, Evaluation as evaluation } from "@prisma/client";

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

// export interface Evaluation {
//   id: string;
//   name: string;
//   status: string;
//   description: string;
//   start_time: string | null;
//   end_time: string | null;
//   form_description: string;
// }

export interface DashboardEvaluation extends evaluation {
  is_submitted: boolean;
}

export namespace Evaluation {
  export function init(): evaluation {
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
  user_id?: string | null;
  name: string;
  github_link: string;
  github_handle: string;
  evaluation_id: string;
  description: any;
  links: any;
}

// export interface VotingTableBodySubmission extends Submission {
//   submission_field: VotingTableBodySubmissionFields[];
// }

// type VotingTableBodySubmissionFields = {
//   char_count: number;
//   field_body: string;
//   field_id: string;
//   heading: string;
//   placeholder: string;
//   subheading: string;
//   submission_field_id: string;
// };

export interface VotingTableBodySubmission extends submission {
  submission_field: VotingTableBodySubmissionFields[];
}

type VotingTableBodySubmissionFields = {
  char_count: number;
  field_body: string;
  field_id: string;
  heading: string;
  placeholder: string;
  subheading: string;
  submission_field_id: string;
};

export interface RoundStatus {
  name: string;
  num_evaluators: number;
  num_submitted: number;
  status: string;
}

export namespace Submission {
  export function init(params: Partial<Omit<submission, "id">> & Pick<submission, "evaluation_id">): submission {
    return {
      description: "",
      name: "",
      user_id: null,
      github_handle: "",
      github_link: "",
      links: [],
      id: uuid(),
      is_submitted: false,
      contract_id: null,
      ...params,
    };
  }
}

export interface RoundDetailsData extends submission {
  user: { github_handle: string };
}
export type SubmissionFormInputs = Omit<submission, "id" | "is_submitted" | "evaluation_id" | "contract_id"> & {
  evaluation_field: SubmissionFormFieldInputs[];
  summary: string;
  specs: string;
  links?: SubmissionFormLinkInputs[];
};

export interface SubmissionFormLinkInputs {
  name: string;
  value: string;
}
export interface SubmissionFormFieldInputs {
  id: string;
  evaluation_id: string;
  heading: string;
  subheading: string;
  placeholder: string;
  char_count: number;
  submission_field: SubmissionFormFieldBodyInputs[];
}
export interface SubmissionFormFieldBodyInputs {
  id: string;
  field_body: string;
  fields_id: string;
  submission_id: string;
}
