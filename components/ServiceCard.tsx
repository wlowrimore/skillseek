"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Service } from "@/sanity/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Blocks, Delete, Star } from "lucide-react";
import { PackageMinus } from "lucide-react";
import { UpdateButton, DeleteButton } from "./MutationButtons";
import { Contact } from "./ServiceContent";

export type ServiceTypeCard = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  pitch: string;
  contact: string;
  ratings?: Array<{
    _id: string;
    rating: number;
    review?: string;
    createdAt: string;
    user: {
      _id: string;
      name: string;
      image?: string;
    };
  }>;
  deleteToken?: string;
  author?: {
    _id: string;
    name?: string;
    email?: string;
    contact: string;
    image?: string;
  };
  _createdAt?: string;
};

const calculateAverageRating = (ratings: ServiceTypeCard["ratings"]) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return sum / ratings.length;
};

const truncateDesc = (text: string, maxLength = 57) => {
  if (!text) return "No description provided";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const ServiceCard = ({
  post,
  service,
  currentUserEmail,
}: {
  post: ServiceTypeCard;
  service: ServiceTypeCard;
  currentUserEmail?: string;
  contact: Contact;
}) => {
  const {
    _createdAt,
    author,
    title,
    category,
    _id,
    contact,
    image,
    description,
    ratings,
  } = post;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { toast } = useToast();
  const isAuthor = Boolean(
    currentUserEmail && author?.email && currentUserEmail === author.email
  );

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
            <h3 className="text-26-semibold line-clamp-1 mb-2">{title}</h3>
          </Link>

          {/* Rating display */}
          {ratings && ratings.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-neutral-400 fill-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {calculateAverageRating(ratings).toFixed(1)} ({ratings.length}{" "}
                {ratings.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          <Link
            href={`/user/${author?._id}`}
            className="flex gap-3 items-center mb-5"
          >
            <Image
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
