import TermsOfServiceContent from "@/components/TermsOfServiceContent";
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

const TermsOfService = () => {
  return (
    <main className="container px-4 w-full md:mx-auto mt-12 md:mt-16 flex flex-col items-center bg-slate-100">
      <TermsOfServiceContent />
    </main>
  );
};

export default TermsOfService;
