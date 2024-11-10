import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  SERVICE_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { displayNameTag } from "@/lib/utils";

import markdownit from "markdown-it";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const nameTag = await displayNameTag();

  const [post, playlist] = await Promise.all([
    client.fetch(SERVICE_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new" }),
  ]);

  const editorPosts = playlist?.select;

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="blue_container bg-swirl-pattern">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={post.image}
          alt="service image"
          width={1000}
          height={1000}
          className="mx-w-[52rem] h-auto rounded-xl object-cover mx-auto"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-lg w-20 h-20 object-cover drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">{nameTag}</p>
              </div>
            </Link>

            <h3 className="text-30-bold">Pitch Details</h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </div>

          <hr className="divider" />

          {editorPosts?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold">Editor Picks</p>

              <ul className="mt-7 card_grid-sm">
                {editorPosts.map((post: ServiceTypeCard, i: number) => (
                  <ServiceCard key={i} post={post} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
