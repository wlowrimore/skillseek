import { SERVICE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import ServiceForm from "@/components/ServiceForm";
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

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await client.fetch(SERVICE_BY_ID_QUERY, {
    id: params?.id,
  });

  return (
    <Suspense fallback={<LoadingBar />}>
      <section className="blue_container bg-swirl-pattern mt-12 md:mt-16">
        <div className="heading">
          <h1 className="">Edit Your Service</h1>
          <h2 className="sub-heading">
            {service.title} by {service.author.name}
          </h2>
        </div>
      </section>
      <ServiceForm initialData={service} authorEmail={service.author._ref} />
    </Suspense>
  );
}
