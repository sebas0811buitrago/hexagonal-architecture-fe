import '@/styles/globals.css';
import { server } from '@test/mocks/handlers/auth';
import type { AppProps } from 'next/app';

server.listen();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
