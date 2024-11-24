import "@/app/globals.css";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';

const inter = Inter({ subsets: ["latin"] });

const uthmanicHafs = localFont({
  src: './fonts/Uthmanic.otf',
  variable: '--font-uthmanic',
});

export const metadata = {
  title: "Islamic Daily Practices",
  description: "Track your daily Islamic practices, prayers, and duas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${uthmanicHafs.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
