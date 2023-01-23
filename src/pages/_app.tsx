import { AppProps } from "next/app";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import localFont from "@next/font/local";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, useSessionContext } from "@supabase/auth-helpers-react";
import AuthWrapper from "src/components/layout/AuthWrapper";
import Head from "next/head";

const aileron = localFont({
  src: [
    {
      path: "../../public/fonts/Aileron-Regular.otf",
      weight: "400",
      style: "normal",
    },

    {
      path: "../../public/fonts/Aileron-Bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aileron-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const sesh = useSessionContext();

  useEffect(() => {
    console.log(sesh);
  }, [sesh]);

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className={aileron.className}>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </div>
      </ThemeProvider>
    </SessionContextProvider>
  );
};

export default App;
