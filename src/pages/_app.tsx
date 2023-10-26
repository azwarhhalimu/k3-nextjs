import MainTemplate from '@/layout/mainTemplate'
import "@/layout/style.all.css"
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }: AppProps) {

  return <MainTemplate>
    <NextNProgress />
    <Component {...pageProps} />
  </MainTemplate>
}
