import { auth } from "@/auth";
import { Metadata } from "next";
import {
  SERVICE_BY_ID_QUERY,
  SERVICES_WITHOUT_SEARCH,
  SERVICES_BY_AUTHOR_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";

import { Suspense } from "react";
import { ServiceCardSkeleton } from "@/components/ServiceCard";

import LoadingBar2 from "@/components/ui/LoadingBar_2";

import { sanityFetch } from "@/sanity/lib/live";
import UserServiceCard, {
  UserServiceCardType,
} from "@/components/UserServiceCard";

export const metadata: Metadata = {
  title: "SkillSeek - User Services",
  description: "User's services on SkillSeek",
};

const UserPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  // If no user is signed in, return not found
  if (!session?.user?.email) return notFound();

  // Fetch the service details
  const { data: serviceDetails } = await sanityFetch({
    query: SERVICE_BY_ID_QUERY,
    params: await { id: params.id },
  });

  // Fetch the selected user's posts
  const { data: posts } = await sanityFetch({
    query: SERVICES_WITHOUT_SEARCH,
    params: await { id: null, serviceId: null }, // No specific filtering here
  });

  // Filters the posts to only include posts by the selected user
  const usersPosts = posts?.filter(
    (post: UserServiceCardType) =>
      post.author?._id === serviceDetails?.author?._id
  );

  return (
    <Suspense fallback={<LoadingBar2 />}>
      <section className="profile_container mb-12 md:my-28">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-xl font-bold uppercase text-center">
              {serviceDetails?.author?.name.split(" ")[0]}&apos;s Services
            </h3>
          </div>

          <img
            src={serviceDetails?.author?.image as string}
            alt={serviceDetails?.author?.name as string}
            loading="lazy"
            width={1000}
            height={1000}
            className="w-44 h-44 object-cover object-top"
          />
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          {/* <p className="text-30-bold">Your Services</p> */}

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

export default UserPage;
