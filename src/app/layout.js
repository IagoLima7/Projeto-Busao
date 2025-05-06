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
  title: "Vai de Busão",
  description: "Sua plataforma de transporte público",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
