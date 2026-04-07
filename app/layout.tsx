import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voidline",
  description: "Precision-Built Systems. Ruthless Performance."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
