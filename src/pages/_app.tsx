import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {

    let next = document!.getElementById("__next");
    next!.style.flexGrow = "1";
    next!.style.display = "flex";
    next!.style.flexDirection = "column";
    next!.style.overflow = "auto";
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
