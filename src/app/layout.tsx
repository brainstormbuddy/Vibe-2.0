import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{ variables: { colorPrimary: "#cd002b" } }}>
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
