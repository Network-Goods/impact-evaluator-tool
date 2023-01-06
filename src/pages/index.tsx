import { action, autorun, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import CreateEvaluationButton from "../components/CreateEvaluationButton";
import EvaluationCard from "../components/EvaluationCard";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { EvaluationsStore } from "../stores/EvaluationsStore";

class ObservableTodoStore {
  todos = [];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
    });
    autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  get report() {
    if (this.todos.length === 0)
      return "<none>";
    const nextTodo = this.todos.find(todo => todo.completed === false);
    return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

const observableTodoStore = new ObservableTodoStore();

const TodoList = observer(({store}: any) => {
  const onNewTodo = () => {
    store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }

  return (
    <div>
      { store.report }
      <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
      </ul>
      { store.pendingRequests > 0 ? 'Loading...' : null }
      <button onClick={ onNewTodo }>New Todo</button>
      <small> (double-click a todo to edit)</small>
    </div>
  );
})

const TodoView = observer(({todo}: any) => {
  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
  }

  const onRename = () => {
    todo.task = prompt('Task name', todo.task) || todo.task;
  }

  return (
    <li onDoubleClick={ onRename }>
      <input
        type='checkbox'
        checked={ todo.completed }
        onChange={ onToggleCompleted }
      />
      { todo.task }
      { todo.assignee
        ? <small>{ todo.assignee.name }</small>
        : null
      }
    </li>
  );
})

// const Index = () => {
//   let store = new EvaluationsStore();
//   store.load();

//   return (
//     <div className="flex flex-col h-full justify-center items-center">
//     <Navbar />

//     <div className="w-[640px]">

//       <TodoList store={observableTodoStore} />
//       {/* {store.evaluations.map(evaluation => <EvaluationCard evaluation={evaluation} />)}
//       <CreateEvaluationButton evaluationsStore={store} /> */}
//     </div>
//   </div>
 
//   );
// };

// export default Index;

import { inject } from "mobx-react";
import { NextPage } from "next";
import { DataStore } from "../stores/DataStore";

type Props = {
  dataStore?: DataStore;
};

const IndexPage: NextPage = inject("dataStore")(
  observer((props: Props) => {
    const dataStore = props.dataStore!;

    return (
      <Layout title='test'>
        <h1>My first Medium article</h1>

        <p>{dataStore.title} 👋</p>

        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dataStore.changeTitle(e.target.value)
          }
        />
      </Layout>
    )}))

  export default IndexPage