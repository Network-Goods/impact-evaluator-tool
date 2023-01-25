import { useEffect } from "react";
import { RoundStatus } from "src/lib";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useStatusStore } from "./StatusStore";

export default function Status() {
  const store = useStatusStore();

  useEffect(() => {
    store.load();
  }, [store.fetching]);

  if (store.fetching) return <LoadingSpinner />;

  return (
    <>
      <div className="flex border-b-2">
        <div className="w-1/3">Name</div>
        <div className="w-1/6">Num Evaluators</div>
        <div className="w-1/6">Num Submitted</div>
        <div className="w-1/6">Status</div>
      </div>
      {store.statuses.map((status, idx) => (
        <StatusItem status={status} key={idx}></StatusItem>
      ))}
    </>
  );
}

function StatusItem({ status }: { status: RoundStatus }) {
  return (
    <>
      <div className="flex">
        <div className="w-1/3">{status.name}</div>
        <div className="w-1/6">{status.num_evaluators}</div>
        <div className="w-1/6">{status.num_submitted}</div>
        <div className="w-1/6">{status.status}</div>
      </div>
    </>
  );
}
