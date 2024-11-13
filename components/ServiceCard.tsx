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

export type ServiceTypeCard = Omit<Service, "author"> & {
  service: {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    pitch: string;
    author: Author;
  };

  author?: Author;
  image?: string;
} & { currentUserEmail?: string };

const ServiceCard = ({
  post,
  service,
  currentUserEmail,
}: {
  post: ServiceTypeCard;
  service: ServiceTypeCard;
  currentUserEmail?: string | undefined;
}) => {
  const { _createdAt, author, title, category, _id, image, description } = post;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  // console.log("CURRENT USER EMAIL:", currentUserEmail);

  const isAuthor = currentUserEmail === service?.author?.email;

  const handleUpdate = async () => {
    router.push(`/service/edit/${service?._id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    setIsDeleting(true);
    try {
      const result = await deleteService(service._id);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Service deleted successfully",
        });
        router.refresh();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        {isAuthor && (
          <div className="flex gap-4 items-center">
            <Button
              onClick={handleUpdate}
              className="bg-green-300 px-2 rounded-lg"
            >
              update
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-400 px-2 rounded-lg"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex-bewtween mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/service/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image as string}
            alt={author?.name as string}
            width={100}
            height={100}
            className="startup-card_avatar max-h-16 max-w-16 object-cover object-center rounded-lg"
          />
        </Link>
      </div>

      <Link href={`/service/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt={title} className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/service/${_id}`}>Details</Link>
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
