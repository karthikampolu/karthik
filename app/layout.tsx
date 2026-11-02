import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import SiteChrome from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "AK — Business Engineering",
  description:
    "Building useful software, understanding businesses, and continuously learning. AK writes about technology, business, and product building.",
  metadataBase: new URL("https://www.karthikampolu.in"),
  openGraph: {
    title: "AK — Business Engineering",
    description:
      "Building useful software, understanding businesses, and continuously learning.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-body antialiased min-h-screen flex flex-col">
        <SiteChrome>
          <Nav />
        </SiteChrome>
        <main className="flex-1">{children}</main>
        <SiteChrome>
          <Footer />
        </SiteChrome>
      </body>
    </html>
  );
}
