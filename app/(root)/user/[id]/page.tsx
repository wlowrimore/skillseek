import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import {
  AUTHOR_BY_ID_QUERY,
  SERVICES_BY_AUTHOR_QUERY,
  SERVICES_QUERY,
  SERVICES_WITHOUT_SEARCH,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getRating, RatingData } from "@/lib/utils";
import ServiceCard from "@/components/ServiceCard";
import { Suspense } from "react";
import { ServiceCardSkeleton, ServiceTypeCard } from "@/components/ServiceCard";
import {
  getAverageRating,
  getRatingsData,
  getServiceRatings,
  ratingsUtils,
} from "@/lib/utils";
import Link from "next/link";
import LoadingBar2 from "@/components/ui/LoadingBar_2";
import { get } from "http";
import { User } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";

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

const UserPage = async ({
  params,
}: {
  params: { id: string; serviceId: string };
}) => {
  const { id, serviceId } = await params;
  const session = await auth();

  const { data: posts } = await sanityFetch({
    query: SERVICES_WITHOUT_SEARCH,
    params: {
      id,
      serviceId: serviceId || null,
    },
  });

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  if (!user) return notFound();

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
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">{isAuthor ? "Your" : "All"} Services</p>

          <ul className={`${posts.length > 0 && "card_grid-sm"}`}>
            <Suspense fallback={<ServiceCardSkeleton />}>
              {posts.length > 0 ? (
                posts.map((post: ServiceTypeCard) => (
                  <ServiceCard
                    ratings={post?.ratings ?? []}
                    averageRating={post?.averageRating ?? 0}
                    key={post?._id}
                    post={post}
                    license={post?.license || ""}
                    licensingState={post?.licensingState || ""}
                    service={post}
                    contact={{ email: post?.contact }}
                    currentUserEmail={
                      session?.user?.email as string | undefined
                    }
                  />
                ))
              ) : (
                <p className="text-16-regular text-center">
                  No services found for this user.
                </p>
              )}
            </Suspense>
          </ul>
        </div>
      </section>
    </Suspense>
  );
};

export default UserPage;
