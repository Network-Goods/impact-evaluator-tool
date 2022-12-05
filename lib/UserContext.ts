import { User } from '@supabase/supabase-js';
import { createContext } from 'react';

export interface UserContextI {
    user_loaded: boolean;
    user: User | null;
    user_roles: string[];
    logout: () => void;
}

const UserContext = createContext<UserContextI | null>(null);

export default UserContext;