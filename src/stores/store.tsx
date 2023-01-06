import { makeAutoObservable } from "mobx";
import sha256 from "crypto-js/sha256";
import { createContext, useContext, useEffect, FC } from "react";

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
  // evaluations: Array<Evaluation> = [];
  blocks: Array<IBlock> = [];
  transactions: Array<string> = [];
  evaluations: Array<string> = [];

  constructor() {
    makeAutoObservable(this);
  }

  createEvaluation(message: string) {
    this.evaluations.push(message);
    // this.evaluations.push({
    //   id: 's',
    //   polling_method: 'undefined',
    //   status: 'draft',
    //   title: 'New Evaluation',
    // });
  }


  addTransaction(message: string) {
    this.transactions.push(message);
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
