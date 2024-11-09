import SearchForm from "@/components/SearchForm";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.user?.email);

  const { data: posts } = await sanityFetch({ query: SERVICES_QUERY, params });

  return (
    <>
      <section className="blue_container bg-swirl-pattern">
        <div className="heading">
          <h1 className="">DIY Projects made easy,</h1>
          <p className="">Thanks to your neighbors</p>
        </div>
        <div className="sub-heading">
          <h2>Find help. Save money. Support your community.</h2>
        </div>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Listed Services"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ServiceTypeCard) => (
              <ServiceCard key={post?._id} post={post} />
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
