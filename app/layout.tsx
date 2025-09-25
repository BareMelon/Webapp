import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StellarForge Nexus",
  description: "Immersive 3D control center for Roblox and Discord communities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

