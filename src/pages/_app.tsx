import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import AuthWrapper from "src/components/AuthWrapper";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider theme={theme}>
        <div className="flex flex-col h-full justify-center items-center">
          <Navbar />

          <div className="w-[640px]">
            <AuthWrapper>
              <Component {...pageProps} />
            </AuthWrapper>
          </div>
        </div>
      </ThemeProvider>
    </SessionContextProvider>
  );
};

export default App;
