import Layout from "@/providers/Layout";
import { TelegramProvider } from "@/providers/TelegramProvider";
import AppKitProvider from "@/providers/Web3Provider";
import { config } from "@/utils/config";
import "@telegram-apps/telegram-ui/dist/styles.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro, Outfit } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const beVietnamPro = Be_Vietnam_Pro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-beVietnamPro",
});

export const metadata: Metadata = {
  title: "Create ETH Mini App",
  description: "Template for creating a Mini App on Ethereum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en" className={`${outfit.variable} ${beVietnamPro.variable}`}>
      <body className={beVietnamPro.className}>
        <AppKitProvider initialState={initialState}>
          <TelegramProvider>
            <Layout>{children}</Layout>
          </TelegramProvider>
        </AppKitProvider>
      </body>
    </html>
  );
}
