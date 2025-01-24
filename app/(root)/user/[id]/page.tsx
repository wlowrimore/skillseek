import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import {
  SERVICES_BY_AUTHOR_QUERY,
  SERVICES_WITHOUT_SEARCH,
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

const UserPage = async () => {
  const session = await auth();

  // If no user is signed in, return not found
  if (!session?.user?.email) return notFound();

  // Fetch the current user's services
  const { data: posts } = await sanityFetch({
    query: SERVICES_WITHOUT_SEARCH,
    params: { serviceId: null, id: null }, // No specific filtering here
  });

  console.log("ALL POSTS:", posts);
  console.log("SESSION USER EMAIL:", session.user.email);
  // Explicitly filter services to only those of the signed-in user
  const usersPosts = posts?.filter(
    (post: UserServiceCardType) =>
      post.author?.email === session.user.email ||
      post.contact === session.user.email
  );

  console.log("USER'S POSTS:", usersPosts);
  return (
    <Suspense fallback={<LoadingBar2 />}>
      <section className="profile_container mb-12 md:my-28">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {session.user.name}
            </h3>
          </div>
          <Image
            src={session?.user.image}
            alt={session?.user.name}
            width={1000}
            height={1000}
            className="w-44 h-44 object-cover object-center rounded-2xl"
          />
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">Your Services</p>

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

// import { auth } from "@/auth";
// import { client } from "@/sanity/lib/client";
// import { Metadata } from "next";
// import {
//   AUTHOR_BY_ID_QUERY,
//   SERVICES_BY_AUTHOR_QUERY,
//   SERVICES_WITHOUT_SEARCH,
// } from "@/sanity/lib/queries";
// import { notFound } from "next/navigation";
// import Image from "next/image";

// import { Suspense } from "react";
// import { ServiceCardSkeleton, ServiceTypeCard } from "@/components/ServiceCard";

// import LoadingBar2 from "@/components/ui/LoadingBar_2";

// import { sanityFetch } from "@/sanity/lib/live";
// import UserServiceCard, {
//   UserServiceCardType,
// } from "@/components/UserServiceCard";

// export const metadata: Metadata = {
//   title: "SkillSeek",
//   authors: [
//     { name: "William Lowrimore", url: "https://williamlowrimore.com" },
//     { name: "Fakenamedev", url: "https://x.com/fakenamedev" },
//   ],
//   description:
//     "Neighbors helping neighbors through community outreach and skill-share.",
//   icons: {
//     icon: "/favicon.ico",
//   },
//   openGraph: {
//     title: "SkillSeek",
//     description:
//       "Neighbors helping neighbors through community outreach and skill-share.",
//     images: [
//       "/brand-logo-new.png",
//       "/brand-logo-cropped.png",
//       "/fakenamedev-logo.png",
//     ],
//     siteName: "SkillSeek",
//     locale: "en_US",
//     type: "website",
//   },
// };

// const UserPage = async ({ searchParams }: { searchParams: { id: string } }) => {
//   const { id } = await searchParams;
//   const session = await auth();

//   const { data: posts } = await sanityFetch({
//     query: SERVICES_WITHOUT_SEARCH,
//     params: {
//       id,
//       serviceId: id,
//     },
//   });

//   const user = await client.fetch(SERVICES_BY_AUTHOR_QUERY, {  });
//   if (!user) return notFound();

//   const usersPosts = posts?.filter(
//     (post: UserServiceCardType) => post.author?.email === user.email
//   );

//   const isAuthor = Boolean(usersPosts);

//   // TEST CONSOLE.LOGS
//   console.log("USER:", user);
//   console.log("POSTS:", posts);
//   console.log("USER'S POSTS:", usersPosts);
//   console.log("IS AUTHOR:", isAuthor);

//   return (
//     <Suspense fallback={<LoadingBar2 />}>
//       <section className="profile_container mb-12 md:my-28">
//         <div className="profile_card">
//           <div className="profile_title">
//             <h3 className="text-24-black uppercase text-center line-clamp-1">
//               {user.name}
//             </h3>
//           </div>

//           <Image
//             src={user.image}
//             alt={user.name}
//             width={1000}
//             height={1000}
//             className="w-44 h-44 object-cover object-center rounded-2xl"
//           />
//         </div>

//         <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
//           <p className="text-30-bold">{isAuthor ? "Your" : "All"} Services</p>

//           <ul className="card_grid-sm">
//             <Suspense fallback={<ServiceCardSkeleton />}>
//               {posts.length > 0 && isAuthor ? (
//                 posts.map((post: ServiceTypeCard) => (
//                   <UserServiceCard
//                     key={post._id}
//                     post={post}
//                     license={post.license || ""}
//                     licensingState={post.licensingState || ""}
//                     service={post}
//                     contact={{ email: post.contact }}
//                     currentUserEmail={
//                       session?.user?.email as string | undefined
//                     }
//                     ratings={post?.ratings ?? []}
//                   />
//                   <ServiceCard
//                     ratings={post?.ratings ?? []}
//                     averageRating={post?.averageRating ?? 0}
//                     key={post?.author?._id}
//                     post={post}
//                     license={post?.license || ""}
//                     licensingState={post?.licensingState || ""}
//                     service={post}
//                     contact={{ email: post?.contact }}
//                     currentUserEmail={
//                       session?.user?.email as string | undefined
//                     }
//                   />
//                 ))
//               ) : (
//                 <p className="text-16-regular text-center">
//                   No services found for this user.
//                 </p>
//               )}
//             </Suspense>
//           </ul>
//         </div>
//       </section>
//     </Suspense>
//   );
// };

// export default UserPage;
