import type { Metadata } from "next";
import { Bangers, Comic_Neue } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const bangers = Bangers({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bangers",
  display: "swap",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shogun & Kaaro | Snack Ramen & Mi Goreng Korea Favorit Indonesia",
  description:
    "Shogun – snack ramen renyah bergaya Korea. Kaaro – mi goreng ala Korea yang autentik. Temukan camilan favorit Anda!",
  keywords: ["shogun", "kaaro", "snack ramen", "mi goreng korea", "makanan ringan", "snack korea"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${bangers.variable} ${comicNeue.variable} font-body`} suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
