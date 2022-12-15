import Dashboard from "../../lib/admin/dashboard/Dashboard";
import {
  DashboardStore,
  DashboardContext,
} from "../../lib/admin/dashboard/DashboardStore";
import {
  NotificationStore,
  NotificationContext,
} from "../../lib/utils/Notifications";

export default function Home() {
  let dashboard_store = new DashboardStore();

  return (
    <DashboardContext.Provider value={dashboard_store}>
      <Dashboard />
    </DashboardContext.Provider>
  );
}
