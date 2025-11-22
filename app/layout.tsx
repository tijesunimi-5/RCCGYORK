import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/Header";



export const metadata: Metadata = {
  title: "RCCG LIving Spring",
  description: "This church is a refuge for sinners, hospital for the sick, miracle center for the needy and a haven of rest for the weary. We aim to develop a people who are Christ-centered and eternity-focused, faithful in ensuring that His will is done on earth as it is in heaven.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/rccg_logo.png" type="image/svg+xml" />
      </head>
      <body
        className={`$ antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
