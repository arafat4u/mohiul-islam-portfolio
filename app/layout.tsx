import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { site, siteUrl } from "@/lib/site";
import { getContent } from "@/lib/store";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: c.seo.title, template: `%s — ${c.profile.name}` },
    description: c.seo.description,
    keywords: site.keywords,
    applicationName: c.profile.fullName,
    authors: [{ name: c.profile.fullName, url: siteUrl }],
    creator: c.profile.fullName,
    publisher: c.profile.fullName,
    category: "design",
    alternates: { canonical: "/" },
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: { type: "profile", url: "/", siteName: c.profile.fullName, title: c.seo.title, description: c.seo.description, locale: site.locale },
    twitter: { card: "summary_large_image", title: c.seo.title, description: c.seo.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">{children}</body>
    </html>
  );
}
