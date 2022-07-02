import type { AppProps } from 'next/app';
import "../../styles/globals.css"
import NavBar from '../components/navbar';
import Head from 'next/head';
import { AuthProvider } from '../context/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>Ichiraku</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
  
}

export default MyApp;
