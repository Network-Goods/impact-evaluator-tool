import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Evaluation, rpc, Submission } from "src/lib";
import { subtle } from "crypto";

export interface SubmissionStore {
  fetching: boolean;
  submission?: any;
  load: (submission_id: string) => void;
  setSubmissionTitle: (title: string) => void;
  setSubmissionDescription: (title: string, link: string) => void;
  setSubmissionLinkTitle: (oldTitle: string, newTitle: string) => void;
  setSubmissionLink: (title: string, link: string) => void;
  setGithubLink: (link: string) => void;
  setGithubHandle: (handle: string) => void;
  createSubmissionLink: (link: any) => void;
  deleteSubmissionLink: (title: string) => void;
}

export const useSubmissionStore = create<SubmissionStore>()((set, get) => ({
  fetching: true,
  submission: null,

  load: async (submission_id: string): Promise<void> => {
    const data = await rpc.call("getSubmissionStore", {
      submission_id: submission_id,
    });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call getSubmission failed. submission_id: ${submission_id}`, data);
      return;
    }

    set({
      submission: data,
      fetching: false,
    });
  },
  setSubmissionTitle: (title: string) => {
    const submission = get().submission;

    if (!submission) {
      return new Error("Submission not loaded");
    }

    set({
      submission: {
        ...submission,
        name: name,
      },
    });

    rpc
      .call("setSubmissionTitle", {
        id: submission.id,
        title: title,
      })
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

    rpc.call("setSubmissionDescription", { newObj: newObj, id: submission.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setSubmissionDescription failed`, data);
        return;
      }
    });
  },
  setSubmissionLinkTitle: (oldTitle: string, newTitle: string) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newArr = submission.links.map((e: any) => {
      if (e.name === oldTitle) {
        return {
          ...e,
          name: newTitle,
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

    rpc.call("setLink", { newArr: newArr, id: submission.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setSubmissionLinkTitle failed`, data);
        return;
      }
    });
  },
  setSubmissionLink: (title: string, link: string) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newArr = submission.link.map((e: any) => {
      if (e.name === title) {
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

    rpc.call("setLink", { newArr: newArr, id: submission.id }).then((data) => {
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

    rpc.call("setGithubLink", { link: link, id: submission.id }).then((data) => {
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

    rpc
      .call("setGithubHandle", {
        id: submission.id,
        github_handle: handle,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setGithubHandle failed`, data);
          return;
        }
      });
  },
  createSubmissionLink: (link: any) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newArr = submission.links
      ? [
          ...submission.links,
          {
            name: link.title,
            value: link.link,
          },
        ]
      : [
          {
            name: link.title,
            value: link.link,
          },
        ];

    set({
      submission: {
        ...submission,
        links: newArr,
      },
    });

    rpc.call("setLink", { newArr: newArr, id: submission.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call createSubmissionLink failed`, data);
        return;
      }
    });
  },
  deleteSubmissionLink: (title: string) => {
    const submission = get().submission;

    if (!submission) {
      return;
    }

    const newArr = submission.links.filter((e: any) => e.name !== title);

    set({
      submission: {
        ...submission,
        links: newArr,
      },
    });

    rpc.call("setLink", { newArr: newArr, id: submission.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call deleteSubmissionLink failed`, data);
        return;
      }
    });
  },
}));
