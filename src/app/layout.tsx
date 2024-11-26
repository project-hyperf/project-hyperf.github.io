import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/Utilities/Providers/QueryProvider";
import { NextUiProvider } from "@/components/Utilities/Providers/NextUiProvider";
import { RecoilProvider } from "@/components/Utilities/Providers/RecoilProvider";

export const metadata: Metadata = {
  title: "HYPERF",
  description:
    "엑사급 초고성능 컴퓨터를 위한 다계층/다목적 오토튜닝 프레임워크 개발",
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
          <RecoilProvider>
            <NextUiProvider>{children}</NextUiProvider>
          </RecoilProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
