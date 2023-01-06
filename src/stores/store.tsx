import { makeAutoObservable } from "mobx";
import sha256 from "crypto-js/sha256";
import { createContext, useContext, useEffect, FC } from "react";
import { v4 as uuid } from "uuid";

interface IBlock {
  hash: string;
  transactions: Array<string>;
}

export interface Evaluation {
  id: string;
  title: string;
  polling_method: "undefined" | "quadratic-voting" | "quantitative-evaluation";
  status: "draft" | "started" | "closed";
} 

class BlockchainStore {
  evaluations: Array<Evaluation> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async createEvaluation(): Promise<Evaluation | Error> {
    let newEvaluation: Evaluation = {
      id: uuid(),
      polling_method: 'undefined',
      status: 'draft',
      title: 'New Evaluation',
    }

    this.evaluations.push(newEvaluation);

    return newEvaluation;
  }
}

const StoreContext = createContext<BlockchainStore>(new BlockchainStore());

const StoreProvider: FC<{ store: BlockchainStore, children: any }> = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { BlockchainStore, StoreProvider, useStore };
