import { Handlers as EvaluationEventHandlers } from './Evaluations';
import { supabase } from '../../supabase';
import { Event, EventListener } from '../Event';

const allHandlers = [...EvaluationEventHandlers];

export const Handlers: EventListener[] = allHandlers.map(handler => {
    return {
        handler: (event: any) => handler.handler(supabase, event),
        eventKind: handler.eventKind,
    }
});