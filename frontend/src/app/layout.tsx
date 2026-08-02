import type { Metadata } from "next";
import { Nunito, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const zenMaru = Zen_Maru_Gothic({
  variable:"--font-zen-maru",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Schedule Snap",
  description: "AIで予定表をGoogleカレンダーに登録するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${nunito.variable} ${zenMaru.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
