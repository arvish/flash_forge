import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Spline from '@splinetool/react-spline/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashForge",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Spline Scene */}
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
