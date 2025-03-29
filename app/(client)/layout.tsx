import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { draftMode } from "next/headers";
import DisableDraftMode from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";
import { SanityLive } from "@/sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce website for shoppers",
  description: "Ecommerce website for educational purpose",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <Header />
          {children}
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 1000,
              style: {
                background: "#000000",
                color: "#fff",
              },
            }}
          />
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
