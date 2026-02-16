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

export const metadata = {
  title: "STUDY ABROAD | Admin Portal",
  description: "Global Education Management System",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}