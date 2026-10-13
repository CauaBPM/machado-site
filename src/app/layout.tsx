import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Barlow, Barlow_Condensed } from "next/font/google";
import { site } from "@/config/site";
import { seoDescription, seoTitle } from "@/lib/seo";
import "./globals.css";

const alfa = Alfa_Slab_One({ weight: "400", subsets: ["latin"], variable: "--font-alfa", display: "swap" });
const barlow = Barlow({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-barlow", display: "swap" });
const barlowCondensed = Barlow_Condensed({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seoTitle, template: `%s | ${site.name}` },
  description: seoDescription,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: seoTitle,
    description: seoDescription,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Logo da Machado Manutenção e Reforma" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  ...(site.googleSiteVerification ? { verification: { google: site.googleSiteVerification } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b1d14",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${alfa.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
