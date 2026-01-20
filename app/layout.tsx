// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google"; // Adicione Dancing_Script
import "./globals.css";
import SmoothScroll from "@/components/providers/smooth-scroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Fonte para a textura de assinatura
const signatureFont = Dancing_Script({ subsets: ["latin"], variable: "--font-signature" });

export const metadata: Metadata = {
  title: "Paulo Henrique | Creative Developer",
  description: "Portfolio Profissional - ADS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${inter.variable} ${signatureFont.variable} font-sans antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}