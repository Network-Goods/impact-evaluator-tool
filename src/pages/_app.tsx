import { AppProps } from "next/app";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Inter } from "@next/font/google";
import { useState } from "react";
import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import AuthWrapper from "src/components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

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
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </ThemeProvider>
    </SessionContextProvider>
  );
};

export default App;
