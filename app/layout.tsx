import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "./Providers";
import { getServerSession } from "next-auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
      <SessionProvider session={session}>
        {children}
        </SessionProvider>
        </body>
    </html>
  );
}
