import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Evaluation, rpc, Submission } from "src/lib";
import { trpc } from "src/lib/trpc";
import { Submission as submission } from "@prisma/client";

export interface SubmissionStore {
  fetching: boolean;
  submission?: any;
  githubHandle?: string;
  load: (submission_id: string, githubHandle: string) => void;
  setSubmissionTitle: (title: string) => void;
  setSubmissionDescription: (title: string, link: string) => void;
  setSubmissionField: (value: string, id: string) => void;
  setSubmissionLinkTitle: (title: string, index: number) => void;
  setSubmissionLink: (link: string, index: number) => void;
  setGithubLink: (link: string) => void;
  setGithubHandle: (handle: string) => void;
  createSubmissionLink: () => void;
  deleteSubmissionLink: (index: number) => void;
  setSubmission: () => void;
  createSubmission: (evaluation_id: string, user_id: string) => Promise<submission | null>;
}

export const useSubmissionStore = create<SubmissionStore>()((set, get) => ({
  fetching: true,
  submission: null,

  load: async (submission_id: string, githubHandle: string): Promise<void> => {
    const data = await trpc().user.getSubmissionStore.query({
      submission_id: submission_id,
    });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call getSubmission failed. submission_id: ${submission_id}`, data);
      return;
    }

    set({
      submission: data,
      githubHandle: githubHandle,
      fetching: false,
    });
  },
  setSubmissionTitle: (title: string) => {
    const submission = get().submission;

    if (!submission) {
      return new Error("Submission not loaded");
    }
    // Trimming the title here and in setSubmissionTitle in methods
    const trimmedTitle = title.trim();

    set({
      submission: {
        ...submission,
        name: trimmedTitle,
      },
    });

    trpc()
      .user.setSubmissionTitle.mutate({ title: trimmedTitle, id: submission.id, user_id: submission.user_id })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setSubmissionTitle failed`, data);
          return;
        }
      });
  },
  setSubmissionDescription: (type: string, text: string) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newObj = {
      ...submission.description,
      [type]: text,
    };

    set({
      submission: {
        ...submission,
        description: newObj,
      },
    });

    trpc()
      .user.setSubmissionDescription.mutate({ description: newObj, id: submission.id })
      .catch((err) => {
        // TODO: error handling
        console.error(`ERROR -- rpc call setSubmissionDescription failed`, err);
      });
  },
  setSubmissionField: (value: string, id: string) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }
    const newObj = submission.evaluation.evaluation_field.map((e: any) => {
      if (e.id === id) {
        return {
          ...e,
          value: value,
        };
      }
      return e;
    });

    set({
      submission: {
        ...submission,
        evaluation: {
          ...submission.evaluation,
          evaluation_field: newObj,
        },
      },
    });
    trpc()
      .user.setSubmissionField.mutate({ value: value, id: id })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setSubmissionField failed`, data);
          return;
        }
      });
  },
  setSubmissionLinkTitle: (title: string, index: number) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newArr = submission.links.map((e: any, idx: number) => {
      if (idx === index) {
        return {
          ...e,
          name: title,
        };
      }
      return e;
    });

    set({
      submission: {
        ...submission,
        links: newArr,
      },
    });

    trpc()
      .user.setLink.mutate({ newArr: newArr, id: submission.id })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setSubmissionLinkTitle failed`, data);
          return;
        }
      });
  },
  setSubmissionLink: (link: string, index: number) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newArr = submission.links.map((e: any, idx: number) => {
      if (idx === index) {
        return {
          ...e,
          value: link,
        };
      }
      return e;
    });

    set({
      submission: {
        ...submission,
        links: newArr,
      },
    });
    trpc()
      .user.setLink.mutate({ newArr: newArr, id: submission.id })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setSubmissionLink failed`, data);
          return;
        }
      });
  },

  setGithubLink: (link: string) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    set({
      submission: {
        ...submission,
        github_link: link,
      },
    });

    trpc()
      .user.setGithubLink.mutate({ link: link, id: submission.id })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setGithubLink failed`, data);
          return;
        }
      });
  },
  setGithubHandle: (handle: string) => {
    const submission = get().submission;

    if (!submission) {
      return new Error("Submission not loaded");
    }
    set({
      submission: {
        ...submission,
        github_handle: handle,
      },
    });
    trpc()
      .user.setGithubHandle.mutate({ id: submission.id, github_handle: handle })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setGithubHandle failed`, data);
          return;
        }
      });
  },
  createSubmissionLink: async () => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newArr = submission.links
      ? [
          ...submission.links,
          {
            name: "",
            value: "",
          },
        ]
      : [
          {
            name: "",
            value: "",
          },
        ];

    set({
      submission: {
        ...submission,
        links: newArr,
      },
    });
    trpc()
      .user.setLink.mutate({ newArr: newArr, id: submission.id })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call createSubmissionLink failed`, data);
          return;
        }
      });
  },
  deleteSubmissionLink: (index: number) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newArr = submission.links.filter((e: any, idx: number) => idx !== index);

    set({
      submission: {
        ...submission,
        links: newArr,
      },
    });

    trpc()
      .user.setLink.mutate({ newArr: newArr, id: submission.id })
      .catch((err) => {
        // TODO: error handling
        console.error(`ERROR -- rpc call setLink failed`, err);
      });
  },
  setSubmission: () => {
    const submission = get().submission;

    if (!submission) {
      return new Error("Submission not loaded");
    }

    set({
      submission: {
        ...submission,
        is_submitted: true,
      },
    });

    trpc()
      .user.setSubmission.mutate({ id: submission.id })
      .catch((err) => {
        // TODO: error handling
        console.error(`ERROR -- rpc call setSubmission failed`, err);
      });
  },
  createSubmission: async (evaluation_id: string, user_id: string): Promise<submission | null> => {
    const githubHandle = get().githubHandle;

    if (get().fetching || !githubHandle) {
      return null;
    }

    const newSubmission = Submission.init({
      evaluation_id: evaluation_id,
      user_id: user_id,
      github_handle: githubHandle,
    });

    const res = await trpc()
      .user.createSubmission.mutate(newSubmission)
      .catch((err) => {
        // TODO: error handling
        console.error(`ERROR -- rpc call createSubmission failed`, err);
        return null;
      });

    if (!res) {
      return null;
    }

    return newSubmission;
  },
}));
