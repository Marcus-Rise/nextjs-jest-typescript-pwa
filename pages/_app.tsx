import React from "react";
import Head from "next/head";
import "../src/styles/globals.scss";
import type { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
