import { auth } from "@/auth";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";
import { UpdateButton, DeleteButton } from "@/components/MutationButtons";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { RatingData } from "./ServiceRatingComponent";
import ServiceRating, { ServiceRatingProps } from "./ServiceRatingComponent";
import ServiceRatingDisplay from "./ServiceRatingDisplay";
import ServiceEmailButton, {
  ServiceEmailButtonProps,
} from "./ui/ServiceEmailButton";
import { Star } from "lucide-react";

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

const calculateAverageRating = (ratings: any[]) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return sum / ratings.length;
};

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

  const parsedContent = post?.pitch || "";

  return (
    <>
      <section className="blue_container bg-swirl-pattern mt-[3.4rem] md:mt-16">
        <p className="tag-mobile md:tag">
          {formatDate(post?._createdAt ?? "")}
        </p>

        <h1 className="heading">{post.title}</h1>

        {/* Rating Summary */}
        {post.ratings && post.ratings.length > 0 && (
          <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-xl mb-4 w-fit">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-semibold">
              {calculateAverageRating(post.ratings).toFixed(1)}
            </span>
            <span className="text-sm text-gray-600">
              ({post.ratings.length}{" "}
              {post.ratings.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}

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

        <div className="space-y-5 mt-6 md:mt-10 max-w-4xl mx-auto">
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

              <div className="leading-5">
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
              providerId={providerId || ""}
              currentUserRating={{
                ...currentUserRating,
                user: {
                  ...currentUserRating?.user,
                  email: post.author?.email ?? "",
                },
              }}
            />
          </div>

          {/* Detailed Reviews Section */}
          {post.ratings && post.ratings.length > 0 && (
            <div className="mt-8">
              <h3 className="text-30-bold text-center md:text-start mb-6">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {post.ratings.map((rating: any) => (
                  <div
                    key={rating._id}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {rating.user?.image && (
                        <Image
                          src={rating.user.image}
                          alt={rating.user.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{rating.user?.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(rating.createdAt)}
                        </p>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating.rating
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {rating.review && (
                      <p className="text-gray-700">{rating.review}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <h3 className="text-30-bold text-center md:text-start">
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
              <p className="text-30-semibold text-center md:text-start">
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
