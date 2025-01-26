"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
import { client } from "@/sanity/lib/client";
import { createValidId } from "@/auth";
import { Contact } from "@/components/ServiceContent";
import LoadingBar from "./LoadingBar";
import LoadingBar2 from "./LoadingBar_2";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface ServiceEmailButtonProps {
  service: {
    _id: string;
    title: string;
    contact: string;
    contactEmail: string;
    author: {
      _id: string;
      name: string;
      email: string;
    };
  };
  contact: Contact;
  contactEmail: string;
}

export default function ServiceEmailButton({
  service,
  contact,
}: ServiceEmailButtonProps) {
  const { data: session } = useSession();
  console.log("Session data:", session);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user?.email === service?.author?.email?.toLowerCase()) {
      setIsOwner(true);
      setIsLoading(false);
      return;
    }
  }, [session?.user?.email, service?.author?.email?.toLowerCase()]);

  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!session?.user) {
      alert("Please sign in to contact service providers");
      return;
    }

    setIsLoading(true);

    try {
      const userEmail = session.user.email.toLowerCase();
      const userExists = await client.fetch(
        `*[_type == "author" && email == $email][0]`,
        { email: userEmail }
      );

      if (!userExists) {
        throw new Error(`No user found with the email ${userEmail}`);
      }

      const userId = userExists._id;

      await verifyReferences(service._id, userId, service.author._id);

      // Check for existing unused rating key
      const existingKey = await checkExistingRatingKey(service._id, userId);

      let ratingKey;

      if (existingKey) {
        ratingKey = existingKey;
        console.log("Using existing rating key:", existingKey);
      } else {
        // Generate a unique key
        const uniqueKey = nanoid(16);
        const documentId = `ratingKey-${nanoid()}`;

        const ratingKeyData = {
          _id: documentId,
          _type: "ratingKey",
          key: uniqueKey,
          slug: {
            _type: "slug",
            current: uniqueKey,
          },
          user: {
            _type: "reference",
            _ref: userId,
          },
          service: {
            _type: "reference",
            _ref: service._id,
          },
          serviceProvider: {
            _type: "reference",
            _ref: service.author._id,
          },
          createdAt: new Date().toISOString(),
          expiresAt: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
          ).toISOString(),
          isUsed: false,
        };

        ratingKey = await client.createIfNotExists(ratingKeyData);

        const response = await fetch("/api/send-contact-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderName: session.user.name,
            senderEmail: session.user.email,
            recipientEmail: service.contact,
            serviceTitle: service.title,
            ratingKey: ratingKey.key,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        setIsLoading(false);
        toast({
          variant: "success",
          title: "Request Sent",
          description:
            "Request for correspondence with the service provider has been sent successfully.",
        });
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  const verifyReferences = async (
    serviceId: string,
    userId: string,
    providerId: string
  ) => {
    console.log("Verifying references with:", {
      serviceId,
      userId,
      providerId,
    });

    const serviceExists = await client.fetch(`*[_id == $serviceId][0]`, {
      serviceId: serviceId,
    });

    if (!serviceExists) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }

    const userExists = await client.fetch(
      `*[_type == "author" && (_id == $userId)][0]`,
      { userId }
    );

    if (!userExists) {
      throw new Error(`User document not found. ID: ${userId}`);
    }

    const providerExists = await client.fetch(`*[_id == $providerId][0]`, {
      providerId: providerId,
    });

    if (!providerExists) {
      throw new Error(`Provider with ID ${providerId} not found`);
    }

    console.log("All references verified successfully");
  };

  const checkExistingRatingKey = async (
    serviceId: string,
    userEmail: string
  ) => {
    console.log("Checking for existing rating key with:", {
      serviceId,
      userEmail,
    });

    const existingKey = await client.fetch(
      `*[_type == "ratingKey" && service._ref == $serviceId && user._ref in *[_type=="author" && email==$userEmail]._id && isUsed == false][0]`,
      {
        serviceId,
        userEmail: userEmail.toLowerCase(),
      }
    );

    if (existingKey) {
      console.log("Found existing unused rating key:", existingKey);
      return existingKey;
    }

    return null;
  };

  return (
    <>
      <button
        onClick={handleEmailClick}
        className={`${isOwner && "absolute mt-6"} disabled:cursor-not-allowed disabled:opacity-40 w-[13rem] inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#275975] hover:bg-[#387da5] disabled:hover:bg-none transition duration-200`}
        disabled={isOwner}
      >
        {isLoading ? (
          <span className="w-full flex items-center justify-center gap-2">
            <Loader2 className="inline-flex border border-transparent brightness-110 w-4 h-4 animate-spin bg-gradient-to-br from-[#578cac] to-[#ff8661] text-[#5394b9] rounded-full" />
            <span className="">Reaching Out Now...</span>
          </span>
        ) : (
          "Contact Service Provider"
        )}
      </button>
      {isOwner && (
        <div className="relative flex flex-col items-center text-sm px-4 rounded-lg py-4 bg-white/40 text-amber-800/90 font-semibold">
          <p className="text-lg">YOU OWN THIS SERVICE LISTING.</p>
          <p>YOU ARE NOT ALLOWED TO RATE IT.</p>
        </div>
      )}
    </>
  );
}
