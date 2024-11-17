"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteService } from "@/lib/actions";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Service } from "@/sanity/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Blocks, Delete } from "lucide-react";
import { PackageMinus } from "lucide-react";
import { UpdateButton, DeleteButton } from "./MutationButtons";

export type ServiceTypeCard = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  pitch: string;
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

const ServiceCard = ({
  post,
  service,
  currentUserEmail,
}: {
  post: ServiceTypeCard;
  service: ServiceTypeCard;
  currentUserEmail?: string;
}) => {
  const { _createdAt, author, title, category, _id, image, description } = post;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
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
        <p className="startup-card_desc">{description}</p>
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
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
