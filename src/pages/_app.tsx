import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { supabase, SupabaseProvider } from "src/lib/supabase";
import { useRouter } from "next/router";
import { useSessionStore } from "src/lib/sessionStore";
import Login from "src/components/Login";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const sessionStore = useSessionStore();
  const [supabase] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      sessionStore.setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      sessionStore.setSession(session);
    });
  }, []);

  if (!sessionStore.session) {
    return <Login />;
  }

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider theme={theme}>
        <div className="flex flex-col h-full justify-center items-center">
          <Navbar />

          <div className="w-[640px]">
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </SessionContextProvider>
  );
};

export default App;
