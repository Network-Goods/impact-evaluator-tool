import { useState, FC } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "src/stores/store";
import CreateEvaluationButton from "src/components/CreateEvaluationButton";



const Evaluations: FC = observer(() => {
  const store = useStore();

  return store.evaluations.length > 0 ? (
    <div>
      <h2>Pending Transactions</h2>
      <ul className="pending">
        {store.evaluations.map((evaluation, index) => (
          <li key={index}>{evaluation.id}</li>
        ))}
      </ul>
    </div>
  ) : null;
});

const Home: FC = () => {
  return (
    <main>
      <Evaluations />
      <CreateEvaluationButton />
    </main>
  );
};

export default Home;
