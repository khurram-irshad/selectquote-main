import "../scss/app.scss";

import { AppProps } from "next/app";
import React from "react";
import { GlobalContextProvider } from "src/context/globalContext";

export default function Apps({ Component, pageProps }: AppProps) {

  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

