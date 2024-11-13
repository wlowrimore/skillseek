import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Service } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type ServiceTypeCard = Omit<Service, "author"> & {
  author?: Author;
  image?: string;
};

const ServiceCard = ({ post }: { post: ServiceTypeCard }) => {
  const { _createdAt, author, title, category, _id, image, description } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
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
