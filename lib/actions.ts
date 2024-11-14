"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

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

  const { title, description, category, image, pitch } =
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

export async function deleteService(id: string) {
  try {
    await client.delete(id);

    revalidatePath("/");

    return {
      status: "SUCCESS",
      message: "Service deleted successfully",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Failed to delete service",
    };
  }
}
