import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/layout';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
  );
}
