import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mastermind Learning — Study Smarter. Feel the Change.",
  description:
    "A guided, practice-first system to transform how you learn — built on the PERRIO Learning System.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-navy-100 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-navy-400">
            <p>&copy; {new Date().getFullYear()} Mastermind Learning.</p>
            <p>Built on the PERRIO Learning System.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
