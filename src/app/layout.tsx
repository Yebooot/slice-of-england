import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Slice of England | Moderná Elegancia",
  description: "Tradičné britské popoludňajšie čaje, doručené až k vám.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="scroll-smooth">
      <body className={`${playfair.variable} ${lato.variable} font-body antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
