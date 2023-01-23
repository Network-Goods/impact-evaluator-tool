import { useEffect } from "react";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { EvaluationCard } from "./EvaluationCard";
import { EvaluationEmptyCard } from "./EvaluationEmptyCard";
import { EvaluationItem } from "./EvaluationItem";
import { useDashboardStore } from "./DashboardStore";
import Title from "src/components/shared/Title";

export default function AdminEdit() {
  const store = useDashboardStore();

  useEffect(() => {
    store.load();
  }, [store]);

  if (store.fetching) return <LoadingSpinner />;
  if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <Title text="Admin Edit Dashboard" />

      {store.evaluations.length !== 0 ? (
        <EvaluationCard>
          {store.evaluations.map((evaluation, idx) => (
            <div key={evaluation.id}>
              <EvaluationItem evaluation={evaluation} first={idx === 0} last={idx === store.evaluations.length - 1} />
            </div>
          ))}
        </EvaluationCard>
      ) : (
        <EvaluationEmptyCard text="No evaluations found." />
      )}
    </>
  );
}
