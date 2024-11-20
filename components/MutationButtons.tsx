"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteService } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import cn from "clsx";
import { ServiceTypeCard } from "@/components/ServiceCard";
import { Blocks, PackageMinus } from "lucide-react";

interface MutationButtonsProps {
  service: ServiceTypeCard;
  deleteToken: ServiceTypeCard;
}

export function UpdateButton({
  service,
  deleteToken,
}: {
  service: ServiceTypeCard;
  deleteToken: string;
}) {
  const router = useRouter();
  const handleUpdate = () => {
    router.push(`/service/edit/${service?._id}`);
  };

  return (
    <span title="Update">
      <Blocks
        onClick={handleUpdate}
        className="size-6 text-green-600 cursor-pointer"
      />
    </span>
  );
}

export function DeleteButton({
  service,
  deleteToken,
}: {
  service: ServiceTypeCard;
  deleteToken: string;
}) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();

    try {
      if (!window.confirm("Are you sure you want to delete this service?")) {
        return;
      }

      setIsDeleting(true);

      console.log("Attempting to delete service:", {
        serviceId: service._id,
        serviceDetails: service,
      });

      const result = await deleteService(service._id);
      console.log("Delete service result:", result);

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
      console.error(
        "Delete error:",
        error instanceof Error ? error.message : error
      );
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete service",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!service?._id) {
    return null;
  }

  return (
    <span title="Delete">
      <PackageMinus
        onClick={handleDelete}
        className={cn(
          "size-6 text-red-600 cursor-pointer",
          isDeleting && "opacity-50 cursor-not-allowed"
        )}
      />
    </span>
  );
}
