import type { AppProps } from 'next/app';
import "../../styles/globals.css"
import NavBar from '../components/navbar';
import Head from 'next/head';
import { AuthProvider } from '../context/auth';
import NextNProgress from 'nextjs-progressbar';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>Ichiraku</title>
      </Head>
      <NavBar />
      <NextNProgress color='#000' height={5} options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </AuthProvider>
  );
  
}

export default MyApp;
