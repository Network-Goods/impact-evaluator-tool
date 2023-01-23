import SubTitle from "src/components/shared/SubTitle";
import Title from "src/components/shared/Title";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import CreateEvaluationButton from "./CreateEvaluationButton";
import CreateRoundTooltip from "./CreateRoundTooltip";
import JoinRoundButton from "./JoinRoundButton";

export default function DashboardHeader() {
  const userProfileStore = useUserProfileStore();

  return (
    <div className="flex flex-col md:flex-row md:justify-between pb-6">
      <div className="pb-6 md:pb-0">
        <div className="pb-2 md:pb-[74px]">
          <Title text="Dashboard" />
        </div>
        <SubTitle text="Ongoing evaluations" />
      </div>
      <div className="md:flex md:flex-col md:justify-between">
        <div className="md:flex md:justify-end pb-2 md:pb-0">
          {userProfileStore.isAdmin() ? (
            <CreateRoundTooltip>
              <div className="pointer-events-none">
                <CreateEvaluationButton />
              </div>
            </CreateRoundTooltip>
          ) : null}
        </div>
        <div className="flex justify-center md:justify-end">
          <JoinRoundButton />
        </div>
      </div>
    </div>
  );
}
