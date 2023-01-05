import { Evaluation } from '../Evaluation';
import * as CreateEvaluation from './CreateEvaluation';
export * as DeleteEvaluation from './DeleteEvaluation';

export { CreateEvaluation };


// interface CommandTypeI {
//     resource_id: string,
//     kind: string,
// }


// type CommandHandleNull<CommandTypeI> = {
//     handle_null(state: Evaluation | null, command: CommandTypeI): void;
//     handle?: never;
// }

// interface CommandHandle<CommandTypeI> {
//     handle_null?: never;
//     handle(state: Evaluation, command: CommandTypeI): void;
// }

// // type CommandKind<S extends String> = S extends `${}`


// type CommandHandler<T> = CommandHandleNull<T> | CommandHandle<T>;
// var mod_is_foo: CommandHandler<CreateEvaluation.Type> = CreateEvaluation;

// // CreateEvaluation.   

// type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}` ? U : never;

// type c = 'Command.EvaluationDeleted'; 

// type P<S extends string> = S extends `Command.${Split<S, '.'>}` ? S : never;

// type a = Split<c, '.'>

// type b = P<c>;