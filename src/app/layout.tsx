import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookNook",
  description: "The app for all your books",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider>
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
            <Navbar />
           
            {children}
          </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
