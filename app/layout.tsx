import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/NavBar";
// Supports weights 300-900
import "@fontsource-variable/figtree";
export const metadata: Metadata = {
  title: "MaligNet",
  description: "Created by Jerone , Celeste , Sebastian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased max-w-7xl mx-auto`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
