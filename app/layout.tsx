import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../store/cartContext";
import { Navbar } from "../components/Navbar";
import { CartSheet } from "../components/CartSheet";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kuro Shop",
  description: "Next Js 13 E-commerce Template with Tailwind CSS and TypeScript by Victor Moreno and Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-kuro-bg`}
      >
        <CartProvider>
          {/* El Navbar ahora tiene el estilo Glassmorphism para que pegue con el dashboard */}
          <Navbar />
          <CartSheet />
          {/* El contenedor del children */}
          <div className="min-h-[calc(100vh-73px)]"> 
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}