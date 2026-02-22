import { Particles } from "@/components/ui/particles";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whispry",
  description:
    "Whispry — a fast, minimal chat app for real-time conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="lofi" className="min-h-screen w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Particles className="fixed inset-0 z-10" color="#000000" />
        {children}
      </body>
    </html>
  );
}
