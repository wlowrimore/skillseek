"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "@/lib/cloudinary";

interface Author {
  _id: string;
  _type: string;
  email: string;
  name?: string;
}

interface ServiceWithAuthorRef {
  _id: string;
  _type: string;
  title: string;
  description: string;
  category: string;
  image: string;
  pitch: string;
  author: {
    _type: string;
    _ref: string;
  };
}

// New interface for service with expanded author
interface ServiceWithAuthor extends Omit<ServiceWithAuthorRef, "author"> {
  author: Author;
}

export const createPitch = async (state: any, form: FormData) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, image, pitch, deleteToken } =
    Object.fromEntries(form);

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const existingAuthor = await writeClient.fetch(
      `*[_type == "author" && email == $email][0]._id`,
      { email: session.user?.email }
    );

    let authorId;

    if (!existingAuthor) {
      // Create new author if doesn't exist
      const newAuthor = await writeClient.create({
        _type: "author",
        name: session.user?.name || "Unknown Author",
        email: session.user?.email,
        image: session.user?.image || "",
        id: session.user?.email,
      });
      authorId = newAuthor._id;
    } else {
      authorId = existingAuthor;
    }

    const service = {
      _type: "service",
      title,
      description,
      category,
      image: image as string,
      deleteToken: deleteToken as string,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: authorId,
      },
      pitch,
    };

    console.log("SERVICE IN action.ts:", service);
    console.log("SERVICE IMAGE IN action.ts:", service.image);

    const result = await writeClient.create(service);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log("Creation error:", error);

    return parseServerActionResponse({
      error:
        error instanceof Error ? error.message : "Failed to create service",
      status: "ERROR",
    });
  }
};

// ----------------------------------------------------------------
//                          MUTATIONS
// ----------------------------------------------------------------

export async function updateService(
  serviceId: string,
  data: Partial<Omit<ServiceWithAuthorRef, "author">>,
  authorEmail: string
) {
  try {
    console.log("\n=== Update Service Debug Info ===");
    console.log("Service ID:", serviceId);
    console.log("Author Email:", authorEmail);

    // Get the existing service first
    const existingService = await client.fetch<ServiceWithAuthor | null>(
      `*[_type == "service" && _id == $serviceId][0]{
        _id,
        _type,
        title,
        description,
        category,
        image,
        pitch,
        "author": author->{
          _id,
          _type,
          email,
          name
        }
      }`,
      { serviceId }
    );

    console.log("\n=== Existing Service ===");
    console.log(JSON.stringify(existingService, null, 2));

    if (!existingService) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }

    // Check if the service's author email matches the provided email
    if (existingService.author.email !== authorEmail) {
      console.log("\n=== Authorization Failed ===");
      console.log("Service Author Email:", existingService.author.email);
      console.log("Provided Email:", authorEmail);
      throw new Error(
        "Unauthorized: You don't have permission to edit this service"
      );
    }

    // Use the existing author reference for the update
    const updatedData = {
      ...data,
      author: {
        _type: "reference",
        _ref: existingService.author._id,
      },
    };

    console.log("\n=== Updated Data to Commit ===");
    console.log(JSON.stringify(updatedData, null, 2));

    const result = await writeClient.patch(serviceId).set(updatedData).commit();

    console.log("\n=== Update Result ===");
    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("\n=== Error updating service ===");
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteService(serviceId: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Authorization required");
    }

    const service = await client.fetch(
      `
      *[_type == "service" && _id == $serviceId][0]{
        _id,
        image,
        deleteToken,
        author->{
          _id,
          email
        }
      }
    `,
      { serviceId }
    );

    console.log("Fetched service:", service);

    if (!service) {
      throw new Error("Service not found");
    }

    if (!service.author) {
      throw new Error("Service author information not found");
    }

    if (service.author.email !== session.user.email) {
      console.log("Auth mismatch:", {
        serviceAuthorEmail: service.author.email,
        currentUserEmail: session.user.email,
      }); // Debug log
      throw new Error(
        "Unauthorized: You don't have permission to delete this service"
      );
    }

    // Delete the image from Cloudinary if deleteToken exists
    if (service.deleteToken) {
      try {
        await deleteCloudinaryImage(service.deleteToken);
        console.log("Cloudinary image deleted successfully");
      } catch (cloudinaryError) {
        console.error("Failed to delete Cloudinary image:", cloudinaryError);
      }
    }

    // Delete the service from Sanity
    await client.delete(serviceId);
    console.log("Service deleted from Sanity successfully");

    revalidatePath("/");

    return {
      status: "SUCCESS",
      message: "Service deleted successfully",
    };
  } catch (error) {
    console.error("Delete error details:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return {
      status: "ERROR",
      message:
        error instanceof Error ? error.message : "Failed to delete service",
    };
  }
}
