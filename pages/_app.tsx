import '../styles/style.scss'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from '../lib/UserContext'
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export default function SupabaseSlackClone({ Component, pageProps }: { Component: any, pageProps: any }) {
  const [user_loaded, setUserLoaded] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [user_roles, setUserRoles] = useState<string[]>([])
  const router = useRouter();
 
  const finish_login = async () => {
    setUserRoles(['admin']);
    // await fetchUserRoles((userRoles) => setUserRoles(userRoles.map((userRole) => userRole.role)));
    router.push('/admin');
    // router.push('/channels/[id]', '/channels/1')
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
      setUserLoaded(session ? true : false);
      console.log('Used loaded ', user_loaded);
      if (session?.user) {
        finish_login();        
      }
    });


    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('auth state change');
      setSession(session)
      const currentUser = session?.user
      setUser(currentUser ?? null)
      setUserLoaded(!!currentUser)
      if (currentUser) {
        finish_login();
      }
    });

    return () => {
      authListener.unsubscribe()
    }
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
    }
  };

     return (
      <UserContext.Provider
        value={{
          user_loaded,
          user,
          user_roles,
          logout,
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    );

}
