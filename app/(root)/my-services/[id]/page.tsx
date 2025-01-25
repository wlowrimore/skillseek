import { auth } from "@/auth";
import { ServiceCardSkeleton } from "@/components/ServiceCard";
import LoadingBar2 from "@/components/ui/LoadingBar_2";
import UserServiceCard, {
  UserServiceCardType,
} from "@/components/UserServiceCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const MyServicesPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  // If no user is signed in, return not found
  if (!session?.user?.email) return notFound();

  // Fetch services for the current logged-in user
  const { data: usersPosts } = await sanityFetch({
    query: SERVICES_BY_AUTHOR_QUERY,
    params: {
      authorId: await client.fetch(
        `*[_type == "author" && email == $email][0]._id`,
        { email: session.user.email }
      ),
    },
  });

  return (
    <Suspense fallback={<LoadingBar2 />}>
      <section className="profile_container mb-12 md:my-28">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-xl font-bold uppercase text-center">
              Your Services
            </h3>
          </div>

          <img
            src={session.user.image as string}
            alt={session.user.name as string}
            loading="lazy"
            width={1000}
            height={1000}
            className="w-44 h-44 object-cover object-top border-[3px] border-black/70 p-[0.8px] rounded-2xl"
          />
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <ul className="card_grid-sm">
            <Suspense fallback={<ServiceCardSkeleton />}>
              {usersPosts && usersPosts.length > 0 ? (
                usersPosts.map((post: UserServiceCardType) => (
                  <UserServiceCard
                    key={post._id}
                    post={post}
                    license={post.license || ""}
                    licensingState={post.licensingState || ""}
                    service={post}
                    contact={{ email: post.contact }}
                    currentUserEmail={session.user.email}
                    ratings={post?.ratings ?? []}
                  />
                ))
              ) : (
                <p className="text-16-regular text-center">
                  You haven't created any services yet.
                </p>
              )}
            </Suspense>
          </ul>
        </div>
      </section>
    </Suspense>
  );
};

export default MyServicesPage;
