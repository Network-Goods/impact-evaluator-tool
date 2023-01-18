import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import LoadingSpinner from "src/components/LoadingSpinner";
import SubTitle from "src/components/SubTitle";
import Title from "src/components/Title";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import CreateEvaluationButton from "./CreateEvaluationButton";
import CreateRoundTooltip from "./CreateRoundTooltip";
import { EvaluationCard } from "./EvaluationCard";
import { EvaluationEmptyCard } from "./EvaluationEmptyCard";
import { EvaluationItem } from "./EvaluationItem";
import JoinRoundButton from "./JoinRoundButton";
import { useDashboardStore } from "./store";

export default function Dashboard() {
  const store = useDashboardStore();
  const supabase = useSupabaseClient();
  const userProfileStore = useUserProfileStore();

  useEffect(() => {
    store.load(supabase, userProfileStore.profile?.id!);
  }, []);

  if (store.fetching) return <LoadingSpinner />;
  if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <div>
      <>
        <div className="flex justify-between pb-14">
          <Title text="Dashboard" />
          {userProfileStore.isAdmin() ? (
            <CreateRoundTooltip>
              <div className="pointer-events-none">
                <CreateEvaluationButton />
              </div>
            </CreateRoundTooltip>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between pb-5">
          <SubTitle text="Ongoing evaluations" />
          <JoinRoundButton />
        </div>
        {store.evaluations.filter(
          (evaluation) => evaluation.status !== "closed"
        ).length !== 0 ? (
          <EvaluationCard>
            {store.evaluations
              .filter((evaluation) => evaluation.status !== "closed")
              .map((evaluation, idx) => (
                <div key={evaluation.id}>
                  <EvaluationItem
                    evaluation={evaluation}
                    last={
                      idx ===
                      store.evaluations.filter(
                        (evaluation) => evaluation.status !== "closed"
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
        {store.evaluations.filter(
          (evaluation) => evaluation.status === "closed"
        ).length !== 0 ? (
          <EvaluationCard>
            {store.evaluations
              .filter((evaluation) => evaluation.status === "closed")
              .map((evaluation, idx) => (
                <div key={evaluation.id}>
                  <EvaluationItem
                    evaluation={evaluation}
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
    </div>
  );
}
