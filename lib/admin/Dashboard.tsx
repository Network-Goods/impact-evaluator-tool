import { use_evaluations } from "./use_evaluations";
import { Evaluation } from "../types";
import Icon from "../Icon";



  function showEvaluationUrl(evaluation: Evaluation) {
    return evaluation.status === "draft"
      ? "/admin/evaluations/" + evaluation.id
      : evaluation.kind === "quadratic-voting"
      ? "/admin/quadratic-voting/" + evaluation.id
      : "";
  }


  export default async function Dashboard() {
    const evaluations = use_evaluations();

    async function create_evaluation() {
      let evaluation = await evaluations.add_evaluation();
      if (!evaluation) {
        return;
      }
      window.location.href = "/admin/evaluations/" + evaluation.id;
    }

    const ongoingEvaluations = evaluations.value.filter((e) => e.status !== "closed");
    const pastEvaluations = evaluations.value.filter((e) => e.status === "closed");

    return (
<div className="section">
  <div className="container">
    <div className="columns mb-5">
      <div className="column">
        <h1 className="title">Dashboard</h1>
      </div>
      <div className="column is-narrow">
        <div className="buttons">
          <button className="button is-primary" type="button" onClick={create_evaluation}>
            <Icon icon="mdi:plus-circle-outline" />
            <span> New evaluation </span>
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div className="mb-6">
      <div className="subtitle">Ongoing evaluations</div>
      <div>
        {ongoingEvaluations.map(evaluation =>
          <div className="evaluation p-4 has-background-white">
            <div className="columns is-vcentered">
              <div className="column">
                <p className="title is-size-5">
                  {evaluation.title}
                </p>
              </div>
              <div className="column is-2 has-text-centered">
                <span
                  className="tag is-uppercase is-light"
                  class:is-success={evaluation.status === "started"}
                  class:is-warning={evaluation.status === "draft"}
                >
                  {evaluation.status}
                </span>
              </div>
              <div className="column is-narrow">
                <div className="buttons">
                  {evaluation.status === "draft" ? 
                    <a className="button is-outlined" href={showEvaluationUrl(evaluation)}>
                      <Icon icon="mdi:pencil" />
                    </a>
                  :
                    <a className="button is-outlined" href={showEvaluationUrl(evaluation)}>
                      <Icon icon="mdi:eye" />
                    </a>
  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <div>
      <div className="subtitle">Past evaluations</div>
      <div>
        {pastEvaluations.map(evaluation => 
          <div className="evaluation p-4 has-background-white">
            <div className="columns is-vcentered">
              <div className="column">
                <p className="title is-size-5">
                  {evaluation.title}
                </p>
              </div>
              <div className="column is-narrow">
                <div className="buttons">
                    <a className="button is-outlined" href={showEvaluationUrl(evaluation)}>
                      <Icon icon="mdi:eye" />
                    </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
    )
  }



{/* <style>
  .evaluation {
    border: solid 1px #cecece;
    border-top: none;
  }
  .evaluation:first-child {
    border-top: solid 1px #cecece;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .evaluation:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
</style> */}
