import { observer } from "mobx-react-lite"
import { Evaluation } from "../stores/EvaluationsStore"
import EditEvaluationButton from "./EditEvaluationButton";


const EvaluationCard = observer(({ evaluation }: { evaluation: Evaluation}) => {
    return (
        <div className="border-2 border-t-0 p-4 flex justify-between" key={evaluation.id}>
          <div>{evaluation.title}</div>
          <EditEvaluationButton evaluation={evaluation} />
        </div>)
});

export default EvaluationCard;
