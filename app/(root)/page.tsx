import { Suspense } from "react";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import SearchForm from "@/components/SearchForm";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";
import { Metadata } from "next";
import LoadingBar2 from "@/components/ui/LoadingBar_2";
import StaticPrivacyPolicy from "@/components/ui/StaticPrivacyPolicy";

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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const query = (await searchParams).query || null;
  const category = (await searchParams).category || null;
  const params = { search: query || null, category: category || null };

  const session = await auth();

  const { data: posts } = await sanityFetch({ query: SERVICES_QUERY, params });

  const displayText = category
    ? `Services in "${category}"`
    : query
      ? `Search results for "${query}"`
      : "All Listed Services";

  return (
    <Suspense fallback={<LoadingBar2 />}>
      <section className="blue_container bg-swirl-pattern pt-2 mt-12 md:mt-16">
        <div className="heading">
          <h1 className="">Find help. Save money.</h1>
          <p className="">Support your community.</p>
          <div className="sub-heading">
            <h2>The marketplace for all your services</h2>
          </div>
        </div>
        <SearchForm query={query ?? ""} />
      </section>
      <section className="section_container">
        <div
          className={`w-full flex ${posts?.length > 0 ? "justify-center lg:justify-start" : "justify-center"}`}
        >
          <p className="text-2xl font-semibold md:text-30-semibold text-center xl:text-start">
            {displayText}
          </p>
        </div>

        <ul
          className={`mt-7 ${posts?.length > 0 ? "card_grid" : `card_grid-sm`}`}
        >
          {posts?.length > 0 ? (
            posts.map((post: ServiceTypeCard) => (
              <ServiceCard
                ratings={post?.ratings ?? []}
                averageRating={post?.averageRating ?? 0}
                license={post?.license || ""}
                licensingState={post?.licensingState || ""}
                key={post?._id}
                post={post}
                service={post}
                contact={{ email: post?.contact }}
                currentUserEmail={session?.user?.email as string | undefined}
              />
            ))
          ) : (
            <p className="no-results_container text-center min-h-[3.6rem]">
              No services found
            </p>
          )}
        </ul>
        <StaticPrivacyPolicy />
      </section>
      <SanityLive />
    </Suspense>
  );
}
