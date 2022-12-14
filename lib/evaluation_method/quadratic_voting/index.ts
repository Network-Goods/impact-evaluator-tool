// Public = onchain soon
// User = onchain never, offline sometime
// Application = onchain sometime


export namespace EvaluationMethod {
    export namespace QuadraticVoting {
        export namespace Public {
            export type EvaluatorSettings = {
                round_id: string;
                voice_credits: { [evaluator_id: string]: number };
            };

            // Output, many (one per evaluator)
            export type EvaluatorOutput = {
                round_id: string,
                evaluator_id: string,
                evaluation: { [project_id: string]: number },
            };

            // Output, one
            export type EvaluationOutput = {
                round_id: string,
                evaluation: { [project_id: string]: number },
            };
        }

        export namespace User {
            export type UserState = {
                round_id: string,
                evaluator_id: string,
                evaluation: { [project_id: string]: number },
            };
        }

        export namespace Application {
            export type RoundConfig = {
                default_voice_credits: number,
            };
        }
    }

    // Pretty much the same as quadrativ voting
    export namespace STARVoting {
        export namespace Public {
            export type EvaluatorSettings = {
                round_id: string;
            };

            // Output, many (one per evaluator)
            export type EvaluatorOutput = {
                round_id: string,
                evaluator_id: string,
                evaluation: { [project_id: string]: number },
            };

            // Output, one
            export type EvaluationOutput = {
                round_id: string,

                // unclear how to reduce from many EvaluatorOutput to one EvaluationOutput, but that is an
                // implementation problem
                evaluation: { [project_id: string]: number },
            };
        }

        export namespace User {
            export type UserState = {
                round_id: string,
                evaluator_id: string,
                evaluation: { [project_id: string]: number },
            };
        }

        export namespace Application {
            export type RoundConfig = {
            };
        }
    }
}

export namespace Round {
    export namespace Public {
        export type Public = {
            round_id: string,
            name: string,
            status: 'draft' | 'inprogress' | 'complete',
        };
    }

    export namespace User {

    }
    export namespace User {

    export namespace Application {
        
    }
}

export namespace Global {
    export namespace Public {
        export type Public = {
            rounds: Round.Public.Public[];

        }
    }

    export namespace User {

    }
}



// vs:

// export namespace Public {
//     export namespace Round {

//     }
// }