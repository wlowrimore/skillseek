import { client } from "@/sanity/lib/client";
import { auth } from "@/auth";
import {
  PLAYLIST_BY_SLUG_QUERY,
  SERVICE_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import ServiceContent from "@/components/ServiceContent";
import { Suspense } from "react";
import LoadingBar2 from "@/components/ui/LoadingBar_2";

// Import our ratings utility
import { ratingsUtils } from "@/lib/utils";

interface ServicePageParams {
  params: {
    id: string;
  };
}

const ServicePage = async ({ params }: ServicePageParams) => {
  if (!params.id) {
    return notFound();
  }

  const session = await auth();

  // Fetch the service data
  const [post, playlist] = await Promise.all([
    client.fetch(SERVICE_BY_ID_QUERY, { id: params.id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  if (!post) return notFound();

  // Process ratings using a utility functions
  const ratings = ratingsUtils.extractRatings(post);
  const averageRating = ratingsUtils.calculateAverageRating(ratings);

  // Extract other necessary data
  const editorPosts = playlist.select || [];
  const authorEmail = post.author?.email;
  const currentUserEmail = session?.user?.email || null;
  const license = post.license || "";
  const licensingState = post.licensingState || "";
  const isAuthor = Boolean(
    currentUserEmail && authorEmail && currentUserEmail === authorEmail
  );

  return (
    <Suspense fallback={<LoadingBar2 />}>
      <div className="flex flex-col justify-center items-center">
        <ServiceContent
          pitch={post?.pitch || ""}
          user={session?.user}
          author={post.author}
          post={post}
          averageRating={averageRating}
          license={license}
          licensingState={licensingState}
          ratings={ratings}
          service={post}
          contact={post?.author?.contact || ""}
          isAuthor={isAuthor}
          currentUserEmail={currentUserEmail}
          editorPosts={editorPosts}
          providerId={post.author._id}
          currentUserRating={
            ratings.find((r) => r.user?.id === session?.user?.id) || {
              _id: "",
              rating: null,
              ratings: [],
              ratingInfo: {
                serviceId: post._id,
                providerId: post.author._id,
              },
              ratingKey: undefined,
              review: "",
              createdAt: new Date().toISOString(),
              user: {
                id: session?.user?.id || "",
                name: session?.user?.name || "",
                email: session?.user?.email || "",
                image: session?.user?.image,
              },
            }
          }
          contactEmail={post?.author?.contact || ""}
        />
      </div>
    </Suspense>
  );
};

export default ServicePage;
