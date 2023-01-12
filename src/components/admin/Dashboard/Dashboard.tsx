import { useEffect } from "react";
import SubTitle from "src/components/SubTitle";
import Title from "src/components/Title";
import CreateEvaluationButton from "./CreateEvaluationButton";
import CreateRoundTooltip from "./CreateRoundTooltip";
import { EvaluationCard } from "./EvaluationCard";
import { EvaluationEmptyCard } from "./EvaluationEmptyCard";
import { EvaluationItem } from "./EvaluationItem";
import JoinRoundButton from "./JoinRoundButton";
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
      <>
        <div className="flex justify-between pb-10">
          <Title text="Dashboard" />

          <CreateRoundTooltip>
            <div className="pointer-events-none">
              <CreateEvaluationButton />
            </div>
          </CreateRoundTooltip>
        </div>
        <div className="flex justify-between pb-6">
          <SubTitle text="Ongoing evaluations" />
          <JoinRoundButton />
        </div>
        {console.log("store.evaluations", store.evaluations)}
        {store.evaluations.filter(
          (evaluation) => evaluation.status !== "closed"
        ) ? (
          <EvaluationCard>
            {store.evaluations
              .filter((evaluation) => evaluation.status !== "closed")
              .map((evaluation, idx) => (
                <div key={evaluation.id}>
                  <EvaluationItem evaluation={evaluation} />
                  {idx <
                  store.evaluations.filter(
                    (evaluation) => evaluation.status !== "closed"
                  ).length -
                    1 ? (
                    <hr className="my-4 border-gray " />
                  ) : null}
                </div>
              ))}
          </EvaluationCard>
        ) : (
          <EvaluationEmptyCard text="You don’t have any ongoing evaluations." />
        )}
        <div className="pt-14 pb-6">
          <SubTitle text="Past evaluations" />
        </div>
        {store.evaluations.filter(
          (evaluation) => evaluation.status === "closed"
        ) ? (
          <EvaluationCard>
            {store.evaluations
              .filter((evaluation) => evaluation.status === "closed")
              .map((evaluation, idx) => (
                <div key={evaluation.id}>
                  <EvaluationItem evaluation={evaluation} />
                  {idx <
                  store.evaluations.filter(
                    (evaluation) => evaluation.status !== "closed"
                  ).length -
                    1 ? (
                    <hr className="my-4 border-gray" />
                  ) : null}
                </div>
              ))}
          </EvaluationCard>
        ) : (
          <EvaluationEmptyCard text="You don’t have any past evaluations." />
        )}
      </>
    </div>
  );
}
