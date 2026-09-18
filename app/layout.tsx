import type {Metadata} from "next";
import type {ReactNode} from "react";
import {Geist, Lora} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Body font (sans-serif), self-hosted & optimized by next/font.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// Heading font (serif) — a second Google Font, applied via CSS variable.
const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Plan, manage, and print ward sacrament meeting programs.",
};

export default function RootLayout({
  children,
}: Readonly<{children: ReactNode}>) {
  return (
    <html lang='en' className={`${geist.variable} ${lora.variable}`}>
      <body className='flex min-h-screen flex-col font-sans antialiased'>
        <Header />
        <main className='mx-auto w-full max-w-4xl flex-1 px-6 py-8'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
