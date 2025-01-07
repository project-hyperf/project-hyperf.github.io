import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/Utilities/Providers/QueryProvider";
import { NextUiProvider } from "@/components/Utilities/Providers/NextUiProvider";
import ModalsProvider from "@/components/Utilities/Providers/ModalProvider";
import { Suspense } from "react";
import { LenisProvider } from "@/components/Utilities/Providers/ScrollProvider";

export const metadata: Metadata = {
  title: "HYPERF",
  description:
    "엑사급 초고성능컴퓨터를 위한 다계층/다목적 오토튜닝 프레임워크 개발",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <QueryProvider>
          <NextUiProvider>
            <ModalsProvider>
              <Suspense>{children}</Suspense>
            </ModalsProvider>
          </NextUiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
