import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fútbol Quizzzzz",
  description: "Una trivia de fútbol muy divertida y facil de jugar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-co">
      <body className="border-gray-200 bg-gray-800 min-h-screen flex flex-col justify-center items-center">
        {children}
      </body>
    </html>
  );
}
