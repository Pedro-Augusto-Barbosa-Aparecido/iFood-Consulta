import type { AppProps } from 'next/app';
import "../../styles/globals.css"
import NavBar from '../components/navbar';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>Ichiraku</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
  
}

export default MyApp;
