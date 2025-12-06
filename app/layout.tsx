import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Runner App",
  description: "A code editor with auto-fix and help features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}