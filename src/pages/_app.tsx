import { AppProps } from "next/app";
import { BlockchainStore, StoreProvider } from "src/stores/store";
import "../styles/globals.css";

const store = new BlockchainStore();

console.log("version ", process.version);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
