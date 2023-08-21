import create from "zustand";
import { rpc, RoundStatus } from "src/lib";
import { trpc } from "src/lib/trpc";

export type StatusStore = {
  fetching: boolean;
  load: () => Promise<void>;
  statuses: RoundStatus[];
};

export const useStatusStore = create<StatusStore>()((set, get) => ({
  fetching: true,
  statuses: [],

  load: async (): Promise<void> => {
    const data = await trpc().admin.getStatusStore.query();

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call getStatusStore failed`, data);
      return;
    }

    set({
      fetching: false,
      statuses: data,
    });
  },
}));
