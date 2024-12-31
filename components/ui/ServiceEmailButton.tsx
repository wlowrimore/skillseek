"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
import { client } from "@/sanity/lib/client";
import { createValidId } from "@/auth";
import { Contact } from "@/components/ServiceContent";
import { set } from "sanity";

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

  useEffect(() => {
    console.log("Service data:", service);
    console.log("Contact data:", contact);
    console.log("Service Contact:", contact.email);
  }, []);

  const contactEmail = contact.email;

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

    // Add more specific logging for service check
    console.log("Checking service document:", serviceId);
    const serviceExists = await client.fetch(`*[_id == $serviceId][0]`, {
      serviceId: serviceId,
    });
    console.log("Service check result:", serviceExists);
    if (!serviceExists) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }

    // Add more specific logging for user check
    console.log("Checking user document:", userId);
    const userExists = await client.fetch(
      `*[_type == "author" && (_id == $userId)][0]`,
      { userId }
    );

    console.log("User verification result:", userExists);

    if (!userExists) {
      throw new Error(`User document not found. ID: ${userId}`);
    }

    // Add more specific logging for provider check
    console.log("Checking provider document:", providerId);
    const providerExists = await client.fetch(`*[_id == $providerId][0]`, {
      providerId: providerId,
    });

    console.log("Provider check result:", providerExists);
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

  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!session?.user) {
      alert("Please sign in to contact service providers");
      return;
    }

    setIsLoading(true);

    console.log("Raw email:", session.user.email);
    const userId = createValidId(session.user.email);
    console.log("Created userId:", userId);

    if (session?.user?.email === service?.author?.email?.toLowerCase()) {
      alert("You cannot rate your own services");
      return;
    }

    console.log("Service data:", {
      serviceId: service._id,
      title: service.title,
      authorId: service.author._id,
    });
    console.log("Session data:", {
      userId: session.user.id,
      userEmail: session.user.email,
    });

    try {
      // First, verify all references exist using the actual IDs
      console.log("Starting email click handler...");

      const userEmail = session.user.email.toLowerCase();
      console.log("Looking up user with email:", userEmail);

      const userDoc = await client.fetch(
        `*[_type == "author" && email == $email][0]{
          _id,
          email,
          name
        }`,
        { email: userEmail }
      );

      console.log("Found user document:", userDoc);

      if (!userDoc) {
        throw new Error(`No user found with the email ${userEmail}`);
        setIsLoading(false);
      }

      const userExists = await client.fetch(
        `*[_type == "author" && email == $email][0]`,
        {
          email: userEmail,
        }
      );

      if (!userExists) {
        throw new Error(`No user found with the email ${userEmail}`);
        setIsLoading(false);
      }

      const userId = userExists._id;

      await verifyReferences(
        service._id, // The actual service ID
        userId, // The actual user ID
        service.author._id // The actual provider ID
      );

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

        console.log("Creating new rating key with data:", ratingKeyData);
        ratingKey = await client.createIfNotExists(ratingKeyData);
        console.log("Rating key creation result:", ratingKey);
      }
      setIsLoading(false);
      console.log("SERVICE CONTACT:", contactEmail);

      const emailBody = `Hi ${service.author.name},

I would like to inquire about your service "${service.title}". Please email me back at ${session.user.email} so we can speak in detail.

Thank you for your time.

Regards,
${session.user.name}
${session.user.email}

--- Note to service provider ---

!!! DO NOT RESPOND TO THIS EMAIL WITHIN THIS EMAIL WINDOW AS IT WILL SEND THE RATING LINK WITH IT !!! 

ONLY RESPOND DIRECTLY TO ${session.user.email}, OR BY CLICKING THE USER'S/CLIENT'S EMAIL ADDRESS SHOWN IN THEIR SIGNATURE. 

--- Rate My Service Link ---

When you are ready to provide the user/client with the rating link, please copy and paste the following link inside an email to the user/client:

${process.env.NEXT_PUBLIC_APP_URL}/rate/${ratingKey.key}

This link carries with it a unique key that will allow the user/client to rate your service.

--- Please note the following: ---

1. The user/client will have 90 days to rate your service.
2. Only send this link when you are ready for the user/client to rate your service.
3. The unique key needed to access this link is a one-time use key so once the user/client has rated your service, the link will no longer be valid.

The rating request will expire in 90 days.`;

      window.location.href = `mailto:${service.contact}?subject=Service Inquiry - ${
        service.title
      }&body=${encodeURIComponent(emailBody)}`;
    } catch (error: any) {
      console.error("Detailed error with full context:", {
        error: error,
        sessionUser: session.user,
        serviceDetails: {
          id: service._id,
          authorId: service.author._id,
        },
      });
      alert(
        `Error: ${error.message || "There was an error preparing the email. Please try again."}`
      );

      if (error.status === 409) {
        alert(
          "A rating key already exists for this service request. Please try again later."
        );
      } else {
        alert(
          `Error: ${error.message || "There was an error preparing the email. Please check the console for details."}`
        );
      }
    }
  };

  return (
    <button
      onClick={handleEmailClick}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#275975] hover:bg-[#387da5] transition duration-200"
    >
      {isLoading ? "Contacting Provider Now..." : "Contact Service Provider"}
    </button>
  );
}
