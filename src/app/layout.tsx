import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "女子プロレスニュース - 最新情報をお届け",
  description: "スターダム、東京女子プロレス、WAVE、アイスリボンなど女子プロレス団体の最新ニュースを集約。PWA対応で快適にご利用いただけます。",
  keywords: "女子プロレス,ニュース,スターダム,東京女子プロレス,WAVE,アイスリボン,プロレス",
  authors: [{ name: "女子プロレスニュース" }],
  manifest: "/manifest.json",
  themeColor: "#ff6b9d",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="女子プロレスニュース" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}