import { useEffect } from "react";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { AdminEditCard } from "./AdminEditCard";
import { AdminEditEmptyCard } from "./AdminEditEmptyCard";
import { AdminEditItem } from "./AdminEditItem";
import { useAdminStore } from "./AdminStore";
import Title from "src/components/shared/Title";

export default function AdminEditDashboard() {
  const store = useAdminStore();

  useEffect(() => {
    store.load();
  }, [store.fetching]);

  if (store.fetching) return <LoadingSpinner />;
  if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <div className="pb-20">
        <Title text="Admin Edit Dashboard" />
      </div>

      {store.evaluations.length !== 0 ? (
        <AdminEditCard>
          {store.evaluations.map((evaluation: any, idx: number) => (
            <div key={evaluation.id}>
              <AdminEditItem evaluation={evaluation} first={idx === 0} last={idx === store.evaluations.length - 1} />
            </div>
          ))}
        </AdminEditCard>
      ) : (
        <AdminEditEmptyCard text="No evaluations found." />
      )}
    </>
  );
}
