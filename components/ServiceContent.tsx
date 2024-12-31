import { auth } from "@/auth";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";
import { UpdateButton, DeleteButton } from "@/components/MutationButtons";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { RatingData } from "./ServiceRatingDisplay";
import ServiceRating, { ServiceRatingProps } from "./ServiceRatingComponent";
import ServiceRatingDisplay from "./ServiceRatingDisplay";
import ServiceEmailButton, {
  ServiceEmailButtonProps,
} from "./ui/ServiceEmailButton";

export interface Contact {
  email: string;
}

interface User {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
  };
}

export interface ServiceContentProps {
  post: ServiceTypeCard;
  review: RatingData;
  service: {
    _id: string;
    title: string;
    contact: string;
    // contactEmail: string;
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
  contactEmail: string;
  contact: Contact;
}

const ServiceContent: React.FC<ServiceContentProps> = async ({
  user,
  post,
  isAuthor,
  currentUserEmail,
  providerId,
  contact,
  contactEmail,
  service,
  currentUserRating,
  editorPosts,
}: ServiceContentProps) => {
  const session = await auth();
  const createdUserName = post.author?.email?.split("@")[0];
  const username = `@${createdUserName}`;
  const userId = { userId: session?.user?.id };
  const review = currentUserRating?.review;
  const parsedContent = post?.pitch || "";

  return (
    <>
      <section className="blue_container bg-swirl-pattern mt-[3.4rem] md:mt-16">
        <p className="text-black text-xl px-4 py-2 bg-white/70 rounded-xl md:rounded-xl md:py-4 md:px-8 md:text-2xl font-semibold !max-w-5xl">
          {post.description}
        </p>
      </section>

      <section className="section_container">
        <div className="relative">
          <Image
            src={post?.image as string}
            alt="service image"
            width={1000}
            height={1000}
            className="mx-auto max-w-[6rem] md:max-w-[55rem] rounded-xl shadow-md shadow-neutral-700 border border-neutral-400"
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
              href={`/user/${post.author?._id}`}
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
            <p className="category-tag">{post.category}</p>
          </div>
          <div className="w-full h-full text-black">
            <ServiceRatingDisplay
              userId={userId.userId}
              serviceId={post._id}
              review={review}
              providerId={providerId || ""}
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

          {/* Service Details & Editor Picks Section */}

          <h3 className="text-30-bold text-center md:text-start pt-5">
            Service Details
          </h3>
          {parsedContent ? (
            <article
              className="text-black max-w-4xl font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}

          <hr className="divider" />

          {editorPosts?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold text-center md:text-start pt-5">
                Editor Picks
              </p>

              <ul className="mt-7 card_grid-sm">
                {editorPosts.map((post: ServiceTypeCard, i: number) => (
                  <ServiceCard
                    key={i}
                    post={post}
                    contact={contact}
                    service={post}
                    currentUserEmail={currentUserEmail || ""}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ServiceContent;
