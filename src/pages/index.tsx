import { useState, FC } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "src/stores/store";


const Form: FC = () => {
  const store = useStore();
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.addTransaction(message);
        store.createEvaluation('test');
        setMessage("");
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

const Transactions: FC = observer(() => {
  const store = useStore();

  return store.transactions.length > 0 ? (
    <div>
      <h2>Pending Transactions</h2>
      <ul className="pending">
        {store.transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
    </div>
  ) : null;
});


const CreateEvaluationButton = observer(() => {
  const store = useStore();

  async function onClick() {
    // This only triggers an update if something has already been added via the Form component
    store.createEvaluation('sss');
  }

  return (
    <button onClick={() => onClick()}>
      Create Round
    </button>
  );
});


const Evaluations: FC = observer(() => {
  const store = useStore();

  return store.transactions.length > 0 ? (
    <div>
      <h2>Pending Transactions</h2>
      <ul className="pending">
        {store.evaluations.map((evaluation, index) => (
          <li key={index}>{evaluation}</li>
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
      <Form />
      <Transactions />
    </main>
  );
};

export default Home;
