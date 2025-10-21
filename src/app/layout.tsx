import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutClient from "@/components/LayoutClient"; // 👈 New client file import

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "OrderZap Dashboard",
  description: "Built with ❤️ by Anusha Qasim using Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
