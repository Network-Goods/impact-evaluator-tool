import create from "zustand";
import { rpc, RoundStatus } from "src/lib";

export type StatusStore = {
  fetching: boolean;
  load: () => Promise<void>;
  statuses: RoundStatus[];
};

export const useStatusStore = create<StatusStore>()((set, get) => ({
  fetching: true,
  statuses: [],

  load: async (): Promise<void> => {
    const data = await rpc.call("getStatusStore", null);

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
