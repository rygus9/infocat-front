import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/layout/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
