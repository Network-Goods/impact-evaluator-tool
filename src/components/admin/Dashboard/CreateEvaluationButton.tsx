import { useRouter } from "next/router";
import Add from "public/images/svg/Add";
import { useState } from "react";
import Button from "src/components/Button";
import { useDashboardStore } from "./store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";

const CreateEvaluationButton = () => {
  const supabase = useSupabaseClient();
  const dashboardStore = useDashboardStore();
  const [disabled, set_disabled] = useState(false);
  const router = useRouter();
  const userProfileStore = useUserProfileStore();

  async function onClick() {
    set_disabled(true);

    const res = await dashboardStore.createEvaluation(supabase);

    if (res instanceof Error) {
      set_disabled(false);
      console.error(res);
      return;
    }

    router.push(`/admin/evaluation/${res.id}`);
    set_disabled(false);
  }

  return (
    <div>
      <Button
        text="Create a Round"
        icon={<Add className="mb-1 fill-white" />}
        onClick={onClick}
        disabled={!userProfileStore.isAdmin()}
      />
    </div>
  );
};

export default CreateEvaluationButton;
