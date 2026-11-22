import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FluorineOS - Debian 13 and Hyprland Wayland Workstation",
  description:
    "Official website and documentation portal for FluorineOS. A clean, customizable Wayland workstation built on Debian 13 (Trixie) and Hyprland 0.55+.",
  metadataBase: new URL("https://fluorineos.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FluorineOS - Debian 13 and Hyprland Wayland Workstation",
    description:
      "A clean, customizable Wayland workstation built on Debian 13 (Trixie) and Hyprland 0.55+. Cohesive out of the box, configured in readable plain text.",
    url: "https://fluorineos.org",
    siteName: "FluorineOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FluorineOS - Debian 13 and Hyprland Wayland Workstation",
    description:
      "A clean, customizable Wayland workstation built on Debian 13 (Trixie) and Hyprland 0.55+.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-[#E2E8F0] font-sans">
        {children}
      </body>
    </html>
  );
}
