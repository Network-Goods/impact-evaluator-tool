import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStore } from "../stores/store";

const CreateEvaluationButton = () => {
    const evaluationsStore = useStore();
  const [disabled, set_disabled] = useState(false);
  const router = useRouter();

  async function on_click() {
    set_disabled(true);

    const res = await evaluationsStore.createEvaluation();

    if (res instanceof Error) {
        set_disabled(false);
        console.error(res);
        return;
    }

    // router.push(`/evaluation/${res.id}`);
    set_disabled(false);
  }

  return (
    <button disabled={disabled} onClick={() => on_click()}>
      Create Round
    </button>
  );
};

export default CreateEvaluationButton;