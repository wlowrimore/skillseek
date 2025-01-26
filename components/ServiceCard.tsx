"use client";

import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ratingsUtils, RatingData, Rating } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { UpdateButton, DeleteButton } from "./MutationButtons";
import { Contact } from "./ServiceContent";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

export interface ServiceTypeCard {
  _id: string;
  title: string;
  pitch: string;
  description: string;
  image: string;
  category: string;
  contact: string;
  author: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  ratings?: RatingData[];
  averageRating?: number;
  license: string;
  licensingState: string;
  _createdAt: string;
  deleteToken: string;
  currentUserEmail: string | null | undefined;
}

export interface ServiceCardProps {
  post: ServiceTypeCard;
  license: string;
  licensingState: string;
  service: ServiceTypeCard;
  currentUserEmail?: ServiceTypeCard["author"]["email"];
  contact: Contact;
  ratings: RatingData[];
  averageRating: number;
}

const truncateDesc = (text: string, maxLength = 57) => {
  if (!text) return "No description provided";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  post,
  service,
  currentUserEmail,
  ratings,
}: {
  post: ServiceTypeCard;
  service: ServiceTypeCard;
  ratings: RatingData[];
  averageRating: number;
  currentUserEmail?: ServiceTypeCard["author"]["email"];
  contact: Contact;
}) => {
  const {
    _createdAt,
    author,
    title,
    category,
    _id,
    image,
    license,
    licensingState,
    averageRating,
    description,
    pitch,
  } = post;
  const isAuthor = Boolean(
    currentUserEmail && author?.email && currentUserEmail === author.email
  );
  console.log("POST IN SERVICE CARD: ", post); // post has a _id parameter
  console.log("SERVICE IN SERVICE CARD: ", service); // service is the same thing as post
  console.log("AUTHOR IN SERVICE CARD: ", author); // author is the same as session.user
  console.log("CURRENT USER EMAIL IN SERVICE CARD: ", currentUserEmail); // current email is the same as author.email and session.user.email
  console.log("POST ID IN SERVICE CARD: ", _id); // is the correct POST._ID (post._id)

  const createdUsername = service?.author?.email?.split("@")[0];
  const username = `@${createdUsername}`;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt ?? "")}</p>
        {isAuthor && (
          <div className="flex gap-4 items-center">
            <UpdateButton service={post} deleteToken={post.deleteToken || ""} />
            <DeleteButton service={post} deleteToken={post.deleteToken || ""} />
          </div>
        )}
      </div>

      <div className="flex-bewtween gap-5">
        <div className="flex-1">
          <Link href={`/service/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>

          {license || licensingState ? (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="border py-0.5 px-2 mb-2 bg-green-700 text-xs font-[600] uppercase text-white tracking-wide rounded-md "
                >
                  View License
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    {service.title} License
                  </DialogTitle>
                  <DialogDescription>
                    This service is licensed and/or certified under the
                    following license id provided by this service provider:
                  </DialogDescription>
                </DialogHeader>
                {/* <div className="flex gap-4 items-center"> */}
                <p className="text-center text-lg">
                  {license}
                  <span className="text-center text-lg">
                    &nbsp; &#40; {licensingState} &#41;
                  </span>
                </p>
                {/* </div> */}
                <DialogFooter>
                  <div className="text-xs text-red-500">
                    <h2>
                      ** DISCLAIMER ** We are not responsible for the validity
                      of this license. Though we aknowledge this license, we
                      STRONLY ADVISE you to verify all licenses with the issuing
                      state or local government.
                    </h2>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="w-fit border py-0.5 px-2 mb-2 bg-black/70 text-xs font-[600] uppercase text-white tracking-wide rounded-md ">
              No License on File
            </div>
          )}
          {ratings && ratings.length > 0 ? (
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-neutral-400 fill-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {ratingsUtils.calculateAverageRating(ratings).toFixed(1)} (
                {ratings.length} {ratings.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          ) : (
            <div className="flex items-center mb-3">
              <p className="text-sm">No ratings yet</p>
            </div>
          )}
          <Link href={`/user/${_id}`} className="flex gap-3 items-center mb-5">
            <Image
              title="User's Services"
              src={author?.image as string}
              alt={author?.name as string}
              width={100}
              height={100}
              className="startup-card_avatar max-h-14 max-w-14 object-cover object-center rounded-2xl"
            />
            <div className="flex flex-col leading-4">
              <p className="line-clamp-1 font-semibold">{author?.name}</p>
              <p className="text-sm">{username}</p>
            </div>
          </Link>
        </div>
      </div>

      <Link href={`/service/${_id}`}>
        <img
          src={image}
          alt={title}
          className="startup-card_img border border-neutral-300"
        />
        <p className="startup-card_desc">{truncateDesc(description)}</p>
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-xs pr-4 md:text-16-medium">{category}</p>
        </Link>
        <Button
          className="startup-card_btn"
          aria-label="Service Details"
          asChild
        >
          <Link href={`/service/${_id}`}>More...</Link>
        </Button>
      </div>
    </li>
  );
};

export const ServiceCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default ServiceCard;
