import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ТОВ ГУМАТРАНССЕРВІС - Шини та шиномонтаж",
  description: "Широкий вибір шин і дисків для вантажних авто в Києві. Професійний шиномонтаж.",
  keywords: "шини, диски, шиномонтаж, Київ, ГУМАТРАНССЕРВІС",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}