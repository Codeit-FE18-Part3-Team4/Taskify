import "@/components/color/color-variables.css";
import ModalProvider from "@/components/modal/modal-provider";
import "@/styles/global.css";
import "@/styles/reset.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { ReactNode } from "react";

const pretendardFont = localFont({
  src: "../assets/fonts/pretendard/PretendardVariable.woff2",
});

function Providers({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <main className={pretendardFont.className}>
        <Component {...pageProps} />
      </main>
    </Providers>
  );
}
