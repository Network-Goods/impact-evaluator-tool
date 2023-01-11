import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { useEffect } from "react";
import SubTitle from "src/components/SubTitle";
import Title from "src/components/Title";
import CreateEvaluationButton from "./CreateEvaluationButton";
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

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#333333",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#333333",
      color: "#ffffff",
      maxWidth: 204.69,
      fontSize: theme.typography.pxToRem(14),
      border: "1px solid #dadde9",
      padding: "10px 24px",
    },
  }));

  return (
    <div>
      <>
        <div className="flex justify-between pb-10">
          <Title text="Dashboard" />

          <div>
            <HtmlTooltip
              title={
                <div className="text-center">
                  <b className="">Coming Soon!</b>
                  <p className="">
                    Round Creation is not available at this time.
                  </p>
                </div>
              }
            >
              <div>
                <div className="pointer-events-none">
                  <CreateEvaluationButton />
                </div>
              </div>
            </HtmlTooltip>
          </div>
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
                    <hr className="my-4" />
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
                    <hr className="my-4" />
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
