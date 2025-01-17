import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import {
  AUTHOR_BY_ID_QUERY,
  SERVICES_BY_AUTHOR_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserServices from "@/components/UserServices";
import { Suspense } from "react";
import { ServiceCardSkeleton, ServiceTypeCard } from "@/components/ServiceCard";
import Link from "next/link";
import LoadingBar2 from "@/components/ui/LoadingBar_2";

export const metadata: Metadata = {
  title: "SkillSeek",
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

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  const services = await client.fetch(SERVICES_BY_AUTHOR_QUERY, { id });

  const isAuthor = session?.user?.email === user.email;

  return (
    <Suspense fallback={<LoadingBar2 />}>
      <section className="profile_container mb-12 md:my-28">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={1000}
            height={1000}
            className="w-44 h-44 object-cover object-center rounded-2xl"
          />
          <div className="flex flex-col justify-center items-center mt-6">
            <p className="font-bold text-lg mb-[-0.5rem]">Email To Connect</p>
            {services &&
              services.map((service: ServiceTypeCard, id: string) => (
                <Link
                  href={`mailto:${service.contact}`}
                  key={id}
                  className="text-center"
                >
                  <span className="text-sm font-[600] hover:underline p-2">
                    {service?.contact}
                  </span>
                </Link>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">{isAuthor ? "Your" : "All"} Services</p>
          <ul className="card_grid-sm">
            <Suspense fallback={<ServiceCardSkeleton />}>
              <UserServices id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </Suspense>
  );
};

export default page;
