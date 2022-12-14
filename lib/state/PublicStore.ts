import { WrappedReactive, wrap_use_state, EvaluationStatus } from "./utils";

interface EvaluationRoundStub {
    id: string;
    name: string;
    status: EvaluationStatus
}

export class PublicStore {
    evaluation_rounds: WrappedReactive<EvaluationRoundStub[]>;

    constructor() {

        this.evaluation_rounds = wrap_use_state([] as any);
    }
}