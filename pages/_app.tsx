import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import network from "../utils/network";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={network}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>Alux Web3 Real Estate</title>
          <meta name="title" content="Alux Web3 Real Estate" />
          <meta name="description" content="Alux Web3 Real Estate" />
          <link rel="icon" type="image/png" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://namka-marketplace.netlify.app/" />
          <meta property="og:title" content="Alux Web3 Real Estate" />
          <meta property="og:description" content="Alux Web3 Real Estate" />
          <meta property="og:image" content="https://namka-marketplace.netlify.app/assets/site_preview.jpg" />
          <meta property="og:updated_time" content="2021-12-06T09:23:21.056Z" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://namka-marketplace.netlify.app/" />
          <meta property="twitter:title" content="Alux Web3 Real Estate" />
          <meta property="twitter:description" content="Alux Web3 Real Estate" />
          <meta property="twitter:image" content="https://namka-marketplace.netlify.app/assets/site_preview.png" />
        </Head>
        <Component {...pageProps} />
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
