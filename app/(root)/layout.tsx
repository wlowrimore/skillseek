import React from "react";
import Navbar from "../../components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkillSeek",
  viewport: "width=device-width, initial-scale=1",
  authors: [
    { name: "William Lowrimore", url: "https://williamlowrimore.com" },
    { name: "Fakenamedev", url: "https://x.com/fakenamedev" },
  ],
  description:
    "Neighbors helping neighbors through community outreach and skill-share.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SkillSeek",
    description:
      "Neighbors helping neighbors through community outreach and skill-share.",
    images: [
      "/brand-logo-new.png",
      "/brand-logo-cropped.png",
      "/fakenamedev-logo.png",
    ],
    siteName: "SkillSeek",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans ml-[calc(var(--sidebar-width)*2.5)]">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      {children}
      <div className="hidden md:block">
        <Footer />
      </div>
    </main>
  );
}
