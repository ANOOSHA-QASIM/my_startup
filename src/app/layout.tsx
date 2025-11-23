import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutClient from "@/components/LayoutClient";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OrderZap Dashboard",
  description: "Built with ❤️ by Anusha Qasim using Next.js",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
          <LayoutClient>{children}</LayoutClient>
        </body>
      </html>
    </ClerkProvider>
  );
}
