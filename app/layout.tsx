import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Nunito, Oswald } from "next/font/google";
import "./globals.css";
import { absoluteUrl, seoKeywords, site, siteUrl } from "./lib/site";

const display = Nunito({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Oswald({
  variable: "--font-sans-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const title =
  "Jual Daging Sapi Segar Halal Temanggung | Lembu Lemu";
const brandImage = absoluteUrl(site.ogImage);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Lembu Lemu",
  },
  description: site.description,
  applicationName: site.name,
  generator: "Next.js",
  keywords: seoKeywords,
  authors: [{ name: "Lembu Lemu" }],
  creator: "Lembu Lemu",
  publisher: "Lembu Lemu",
  category: "LocalBusiness",
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [
      {
        url: brandImage,
        width: 500,
        height: 500,
        alt: "Logo dan identitas Lembu Lemu Temanggung",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [brandImage],
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: site.logo, sizes: "500x500", type: "image/webp" },
    ],
    shortcut: [{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "a0b0981800d53c8a",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8f171b",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
