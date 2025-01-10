"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ServiceTypeCard } from "@/components/ServiceCard";
import { deleteService } from "@/lib/actions"; // adjust import path
import { cn } from "@/lib/utils";
import { Blocks, PackageMinus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function UpdateButton({
  service,
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
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("Attempting to delete service:", {
        serviceId: service._id,
        serviceDetails: service,
      });

      const result = await deleteService(service._id);
      console.log("Delete service result:", result);

      if (result.status === "SUCCESS") {
        toast({
          variant: "success",
          title: "Success",
          description: "Service deleted successfully",
        });
        router.refresh();
        router.push("/");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(
        "Delete error:",
        error instanceof Error ? error.message : error
      );
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete service",
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  if (!service?._id) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <span title="Delete">
          <PackageMinus
            className={cn(
              "size-6 text-red-600 cursor-pointer",
              isDeleting && "opacity-50 cursor-not-allowed"
            )}
          />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            service "{service.title}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
