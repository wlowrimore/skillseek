import { client } from "@/sanity/lib/client";
import { auth } from "@/auth";
import {
  PLAYLIST_BY_SLUG_QUERY,
  SERVICE_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { RatingData } from "../../../../components/ServiceRatingDisplay";
import { notFound } from "next/navigation";

type sParams = {
  id: string;
};

import ServiceContent from "@/components/ServiceContent";
import { Suspense } from "react";
import LoadingBar from "@/components/ui/LoadingBar";
import LoadingBar2 from "@/components/ui/LoadingBar_2";

const page = async ({ params }: { params: sParams }, review: RatingData) => {
  const { id } = await params;

  const session = await auth();

  const [post, playlist] = await Promise.all([
    client.fetch(SERVICE_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  console.log("Full post data:", JSON.stringify(post, null, 2));

  const editorPosts = playlist?.select || [];

  if (!post) return notFound();

  const authorEmail = post.author?.email;
  const currentUserEmail = session?.user?.email || null;
  const isAuthor = Boolean(
    currentUserEmail && authorEmail && currentUserEmail === authorEmail
  );

  return (
    <Suspense fallback={<LoadingBar2 />}>
      <div className="flex flex-col justify-center items-center">
        <ServiceContent
          user={session?.user}
          post={post}
          review={review}
          service={post}
          contact={post?.author?.contact || ""}
          isAuthor={isAuthor}
          currentUserEmail={currentUserEmail}
          editorPosts={editorPosts}
          providerId={post.author._id}
          currentUserRating={post.currentUserRating}
          contactEmail={post?.author?.contact || ""}
        />
      </div>
    </Suspense>
  );
};

export default page;
