import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Jersey_15, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Pixel display face for h1, h2, and the wordmark. Jersey 15 is a
// bitmap-derived cut with a single 400 weight, so it must never be bolded or
// synthesised: either would break its pixel grid.
const jersey15 = Jersey_15({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = "FluorineOS - Debian 13 and Hyprland Wayland Workstation";
const description =
  "Official website and documentation portal for FluorineOS. A clean, customizable Wayland workstation built on Debian 13 (Trixie) and Hyprland 0.55+.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "FluorineOS",
  metadataBase: new URL("https://fluorineos.pages.dev"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/fluorine-logo.png", type: "image/png" }],
    apple: [{ url: "/fluorine-logo.png", type: "image/png" }],
  },
  openGraph: {
    title,
    description:
      "A clean, customizable Wayland workstation built on Debian 13 (Trixie) and Hyprland 0.55+. Cohesive out of the box, configured in readable plain text.",
    url: "https://fluorineos.pages.dev",
    siteName: "FluorineOS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/fluorine-banner.png",
        width: 3780,
        height: 1890,
        alt: "FluorineOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "A clean, customizable Wayland workstation built on Debian 13 (Trixie) and Hyprland 0.55+.",
    images: ["/fluorine-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "jbb3LWNWXbxsVzqhl_pN1d8YMdcv1SQ-WIASjjBGakc",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jersey15.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-primary">
        {children}
      </body>
    </html>
  );
}
