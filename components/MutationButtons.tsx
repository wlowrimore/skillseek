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
}

export function UpdateButton({ service }: MutationButtonsProps) {
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

export function DeleteButton({ service }: MutationButtonsProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = () => (e: React.MouseEvent<SVGSVGElement>) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    setIsDeleting(true);
    deleteService(service._id)
      .then((result) => {
        if (result.status === "SUCCESS") {
          toast({
            title: "Success",
            description: "Service deleted successfully",
          });
          router.refresh();
        } else {
          throw new Error(result.message);
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <span title="Delete">
      <PackageMinus
        onClick={handleDelete()}
        className={cn(
          "size-6 text-red-600 cursor-pointer",
          isDeleting && "opacity-50 cursor-not allowed"
        )}
      />
    </span>
  );
}
