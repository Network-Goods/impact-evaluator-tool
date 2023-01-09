import { AppProps } from "next/app";
import { useEffect } from "react";
import Navbar from "src/components/Navbar";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SupabaseProvider } from "src/lib/supabase";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SupabaseProvider>
      <ThemeProvider theme={theme}>
        <div className="flex flex-col h-full justify-center items-center">
          <Navbar />

          <div className="w-[640px]">
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </SupabaseProvider>
  );
};

export default App;
