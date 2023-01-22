import { useEffect } from "react";
import LoadingSpinner from "src/components/LoadingSpinner";
import SubTitle from "src/components/SubTitle";
import DashboardHeader from "./DashboardHeader";
import { EvaluationCard } from "./EvaluationCard";
import { EvaluationEmptyCard } from "./EvaluationEmptyCard";
import { EvaluationItem } from "./EvaluationItem";
import { useDashboardStore } from "./DashboardStore";

export default function Dashboard() {
  const store = useDashboardStore();

  useEffect(() => {
    store.load();
  }, []);

  if (store.fetching) return <LoadingSpinner />;
  if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <DashboardHeader />
      {store.evaluations.filter(
        (evaluation) =>
          evaluation.status !== "closed" && evaluation.status !== "draft"
      ).length !== 0 ? (
        <EvaluationCard>
          {store.evaluations
            .filter(
              (evaluation) =>
                evaluation.status !== "closed" && evaluation.status !== "draft"
            )
            .map((evaluation, idx) => (
              <div key={evaluation.id}>
                <EvaluationItem
                  evaluation={evaluation}
                  first={idx === 0}
                  last={
                    idx ===
                    store.evaluations.filter(
                      (evaluation) =>
                        evaluation.status !== "closed" &&
                        evaluation.status !== "draft"
                    ).length -
                      1
                  }
                />
              </div>
            ))}
        </EvaluationCard>
      ) : (
        <EvaluationEmptyCard text="You don’t have any ongoing evaluations." />
      )}
      <div className="pt-14 pb-6">
        <SubTitle text="Past evaluations" />
      </div>
      {store.evaluations.filter((evaluation) => evaluation.status === "closed")
        .length !== 0 ? (
        <EvaluationCard>
          {store.evaluations
            .filter((evaluation) => evaluation.status === "closed")
            .map((evaluation, idx) => (
              <div key={evaluation.id}>
                <EvaluationItem
                  evaluation={evaluation}
                  first={idx === 0}
                  last={
                    idx ===
                    store.evaluations.filter(
                      (evaluation) => evaluation.status === "closed"
                    ).length -
                      1
                  }
                />
              </div>
            ))}
        </EvaluationCard>
      ) : (
        <EvaluationEmptyCard text="You don’t have any past evaluations." />
      )}
    </>
  );
}
