import SearchForm from "@/components/SearchForm";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const query = (await searchParams).query || null;
  const category = (await searchParams).category || null;

  const params = { search: query || null, category: category || null };

  const session = await auth();

  console.log(session?.user?.email);

  const { data: posts } = await sanityFetch({ query: SERVICES_QUERY, params });

  const displayText = category
    ? `Services in "${category}"`
    : query
      ? `Search results for "${query}"`
      : "All Listed Services";

  return (
    <>
      <section className="blue_container bg-swirl-pattern pt-2 md:mt-16">
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
        <p className="text-30-semibold text-center md:text-start">
          {displayText}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ServiceTypeCard) => (
              <ServiceCard
                key={post?._id}
                post={post}
                service={post}
                currentUserEmail={session?.user?.email as string | undefined}
              />
            ))
          ) : (
            <p className="no-results">No services found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
