import "../scss/app.scss";

import { AppProps } from "next/app";
import React from "react";

export default function Apps({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
