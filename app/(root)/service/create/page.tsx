import ServiceForm from "@/components/ServiceForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoadingBar from "@/components/ui/LoadingBar";
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

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <Suspense fallback={<LoadingBar />}>
      <div className="mt-12 md:mt-16 pb-16">
        <section className="blue_container bg-swirl-pattern">
          <h1 className="heading">Share Your Service with the comminity</h1>
        </section>
        <ServiceForm authorEmail={session?.user?.email} />
      </div>
    </Suspense>
  );
};

export default page;
