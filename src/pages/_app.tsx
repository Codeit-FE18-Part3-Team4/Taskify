import '@/styles/reset.css';
import "@/components/color/color.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const pretendardFont = localFont({
  src: "../assets/fonts/pretendard/PretendardVariable.woff2",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={pretendardFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
