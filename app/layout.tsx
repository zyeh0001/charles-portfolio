import type { Metadata } from "next";
import { Space_Grotesk, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charles Yeh | Software Engineer",
  description:
    "Software Engineer with expertise in React, TypeScript, and modern web technologies. Building scalable, user-focused applications.",
  keywords: [
    "Software Engineer",
    "React",
    "TypeScript",
    "Next.js",
    "Web Developer",
    "Charles Yeh",
  ],
  authors: [{ name: "Charles Yeh" }],
  openGraph: {
    title: "Charles Yeh | Software Engineer",
    description:
      "Software Engineer with expertise in React, TypeScript, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${archivo.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
