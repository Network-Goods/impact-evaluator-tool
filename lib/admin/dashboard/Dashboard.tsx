import { useContext, useEffect, useState } from "react";

import { Evaluation } from "../../types";
import { QueryWrapper } from "../../utils";
import { DashboardContext } from "./DashboardStore";
import { NotificationContext } from "../../utils/Notifications";

export default function Dashboard() {
  let store = useContext(DashboardContext);
  let notifications = useContext(NotificationContext);

  useEffect(() => {
    store.load();
  }, []);

  return (
    <div>
      {notifications.render()}
      <CreateEvaluationButton />
      <QueryWrapper
        result={store.rounds}
        mapper={(value: Evaluation) => (
          <EvaluationEL key={value.id} evaluation={value} />
        )}
      />
    </div>
  );
}

function CreateEvaluationButton() {
  let store = useContext(DashboardContext);

  let [disabled, set_disabled] = useState(false);

  async function on_click() {
    set_disabled(true);
    await store.create_round();
    set_disabled(false);
  }

  return (
    <button disabled={disabled} onClick={() => on_click()}>
      Create Round
    </button>
  );
}

function EvaluationEL({ evaluation }: { evaluation: Evaluation }) {
  return <div>{evaluation.title}</div>;
}
