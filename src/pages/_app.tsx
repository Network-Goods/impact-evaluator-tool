import { AppProps } from "next/app";
import Navbar from "src/components/Navbar";
import { BlockchainStore, StoreProvider } from "src/stores/store";
import "../styles/globals.css";

const store = new BlockchainStore();

console.log("version ", process.version);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
         <div className="flex flex-col h-full justify-center items-center">
          <Navbar />

          <div className="w-[640px]">
            <Component {...pageProps} />
       </div>
     </div>
     </StoreProvider>
  );
}

export default MyApp;
