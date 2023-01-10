import { AppProps } from "next/app";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SupabaseProvider } from "src/lib/supabase";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </ThemeProvider>
    </SupabaseProvider>
  );
};

export default App;
