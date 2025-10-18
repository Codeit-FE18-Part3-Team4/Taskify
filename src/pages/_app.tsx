import "@/components/color/color-variables.css";
import ModalProvider from "@/components/modal/modal-provider";
import { AuthProvider } from "@/features/auth/components/auth-provider";
import TagsProvider from "@/features/card/components/tag-input/tags-provider";
import "@/styles/global.css";
import "@/styles/reset.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { ReactNode } from "react";
import DashboardProvider from "../features/my-dashboard/dashboard-provider";

const pretendardFont = localFont({
  src: "../assets/fonts/pretendard/PretendardVariable.woff2",
});

function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <TagsProvider>
          <DashboardProvider>
            <DashboardProvider>{children}</DashboardProvider>
          </DashboardProvider>
        </TagsProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <Providers>
      <main className={pretendardFont.className}>
        {getLayout(<Component {...pageProps} />)}
      </main>
    </Providers>
  );
}
