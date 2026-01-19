import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Importando fontes
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll"; // Vamos criar isso

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Paulo Henrique | Creative Developer",
  description: "Portfolio interativo de Paulo Henrique, estudante de ADS e desenvolvedor Full Stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark"> 
      <body className={`${inter.variable} ${playfair.variable} bg-neutral-950 text-neutral-100 antialiased overflow-x-hidden`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}