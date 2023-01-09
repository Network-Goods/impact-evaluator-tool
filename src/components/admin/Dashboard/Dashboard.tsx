import { useEffect } from "react";
import CreateEvaluationButton from "./CreateEvaluationButton";
import { EvaluationCard } from "./EvaluationCard";
import { useDashboardStore } from "./store";

export default function Dashboard() {
  const store = useDashboardStore();

  useEffect(() => {
    store.load();
  }, []);

  if (store.fetching) return <p>Loading...</p>;
  if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <div>
      {store.draftEvaluations.map((evaluation) => (
        <EvaluationCard key={evaluation.id} evaluation={evaluation} />
      ))}
      <CreateEvaluationButton />
    </div>
  );
}
