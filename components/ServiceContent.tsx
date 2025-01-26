import { auth } from "@/auth";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";
import { UpdateButton, DeleteButton } from "@/components/MutationButtons";
import Link from "next/link";
import Image from "next/image";
import ServiceRatingDisplay from "./ServiceRatingDisplay";
import ServiceEmailButton from "./ui/ServiceEmailButton";
import { Suspense } from "react";
import LoadingBar2 from "./ui/LoadingBar_2";
import { RatingData } from "@/lib/utils";

export interface Contact {
  email: string;
}

export interface ServiceContentProps {
  post: ServiceTypeCard;
  license: string;
  licensingState: string;
  pitch: string;
  averageRating?: number;
  author: ServiceTypeCard["author"];
  service: {
    _id: string;
    title: string;
    contact: string;
    author: {
      _id: string;
      name: string;
      email: string;
    };
  };
  user:
    | {
        id: string;
        name: string;
        email: string;
        image: string;
      }
    | null
    | undefined;
  isAuthor: boolean;
  currentUserEmail: string | null;
  providerId: string;
  currentUserRating: RatingData;
  editorPosts: ServiceTypeCard[];
  ratings: ServiceTypeCard["ratings"];
  contactEmail: string;
  contact: Contact;
}

const ServiceContent: React.FC<ServiceContentProps> = async ({
  post,
  license,
  licensingState,
  ratings = [],
  averageRating = 0,
  isAuthor,
  currentUserEmail,
  providerId,
  contact,
  contactEmail,
  service,
  currentUserRating,
  editorPosts,
}: ServiceContentProps) => {
  console.log("LICENSE:", license);
  console.log("POST:", post);
  const session = await auth();
  const createdUserName = post.author?.email?.split("@")[0];
  const username = `@${createdUserName}`;
  const parsedContent = post?.pitch || "";

  console.log("EDITOR POSTS:", editorPosts);
  console.log("POST:", post);
  console.log("AUTHOR:", post.author);

  return (
    <Suspense fallback={<LoadingBar2 />}>
      <section className="blue_container bg-swirl-pattern mt-[3.4rem] md:mt-16">
        <div className="text-white flex flex-col justify-center items-center bg-black/70 max-w-[36rem] md:!max-w-[55rem] px-[1.15rem] md:px-10 py-2 md:py-12 md:space-y-4 rounded-xl md:rounded-xl md:text-2xl font-semibold">
          <h1 className="text-2xl md:text-5xl text-center md:text-start font-bold">
            {post.title}
          </h1>

          <h2 className="text-black bg-slate-300/80 rounded-lg px-4 py-2 mt-3 mb-2 leading-tight text-base md:mt-4 md:text-2xl max-w-[50rem] md:w-[90%]">
            {post.description}
          </h2>
        </div>
      </section>
      <div className="md:hidden w-full flex justify-start px-6 pt-4">
        <p className="category-tag">{post.category}</p>
      </div>
      {license && licensingState && (
        <div className="text-xs w-full xl:w-[80%] 2xl:w-[40%] flex flex-col mx-auto pl-6 md:pl-5 lg:pl-16 -mb-[1rem] md:-mb-[4rem] md:text-lg italic text-black/70 pt-4">
          <div className="flex items-center -mb-1 md:-mb-3">
            <p className="text-black">
              License: <span className="text-black/70">{license}</span>
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-black">
              Issuing State:{" "}
              <span className="text-black/70">{licensingState}</span>
            </p>
          </div>
        </div>
      )}
      <section className="section_container">
        <div className="relative h-[24rem] md:h-[40rem] md:max-h-[40rem]">
          <Image
            src={post?.image as string}
            alt="service image"
            width={1000}
            height={1000}
            className="mx-auto object-cover w-full h-full md:max-w-[56rem] rounded-xl shadow-md shadow-neutral-700 border border-neutral-400"
          />

          {isAuthor && (
            <div className="absolute right-[3%] md:right-[15%] bottom-[2%] z-1 bg-black/90 px-4 py-1.5 rounded-full flex gap-4 items-center">
              <UpdateButton
                service={post}
                deleteToken={post.deleteToken || ""}
              />
              <DeleteButton
                service={post}
                deleteToken={post.deleteToken || ""}
              />
            </div>
          )}
        </div>

        <div className="space-y-2 mt-6 md:mt-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link
              href={`/user/${post?._id}`}
              className="flex gap-2 items-center"
            >
              <Image
                src={post?.author?.image as string}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full w-12 h-12 md:w-16 md:h-16 object-cover drop-shadow-lg"
              />

              <div>
                <p className="md:text-xl font-semibold">{post?.author?.name}</p>
                <p className="text-sm">{username}</p>
              </div>
            </Link>
            <span className="flex flex-col items-center w-fit my-6 md:my-0 md:mr-6">
              <ServiceEmailButton
                service={{
                  ...service,
                  contactEmail: contact.email,
                }}
                contact={contact}
                contactEmail={contactEmail}
              />
            </span>
            <p className="hidden md:block category-tag">{post.category}</p>
          </div>
          <div className="w-full h-full text-black">
            <ServiceRatingDisplay
              userId={session?.user?.id}
              serviceId={post._id}
              ratings={ratings}
              averageRating={post?.averageRating}
              providerId={providerId}
              currentUserRating={{
                ...currentUserRating,
                review: currentUserRating?.review || "",
                user: {
                  ...currentUserRating?.user,
                  email: post.author?.email ?? "",
                },
              }}
            />
          </div>
          <hr className="divider" />

          {/* Service Details & Editor Picks Section */}

          <h3 className="text-30-bold text-center md:text-start pt-6 md:pt-8">
            Service Details
          </h3>
          {parsedContent ? (
            <article
              className="text-black max-w-4xl font-work-sans whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}

          <hr className="divider" />

          {editorPosts?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-bold text-center md:text-start pt-5">
                Editor Picks
              </p>

              <ul className="mt-7 card_grid">
                {editorPosts.map((post: ServiceTypeCard, i: number) => (
                  <ServiceCard
                    key={i}
                    post={post}
                    ratings={post.ratings ?? []}
                    averageRating={averageRating || 0}
                    contact={contact}
                    license={license || ""}
                    licensingState={licensingState || ""}
                    service={post}
                    currentUserEmail={currentUserEmail || ""}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </Suspense>
  );
};

export default ServiceContent;
