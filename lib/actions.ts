"use server";

import { auth } from "@/auth";
import { extractPublicIdFromUrl, parseServerActionResponse } from "@/lib/utils";
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
  image: string;
}

export type Service = {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  image: string;
  license: string;
  licensingState: string;
  category: string;
  pitch: string;
  contact: string;
  author: Author;
};

export type ServiceWithAuthorRef = Omit<Service, "author"> & {
  author: {
    _ref: string;
    email: string;
  };
};

// New interface for service with expanded author
interface ServiceWithAuthor extends Omit<ServiceWithAuthorRef, "author"> {
  author: Author;
  deleteToken: string;
}

export type ServiceFormData = {
  title: string;
  description: string;
  category: string;
  image: string;
  license: string;
  licensingState: string;
  imageDeleteToken?: string;
  pitch: string;
  contact: string;
};

export const createPitch = async (state: any, form: FormData) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const {
    title,
    description,
    category,
    image,
    license,
    licensingState,
    pitch,
    deleteToken,
    contact,
  } = Object.fromEntries(form);

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
      license: license as string,
      licensingState: licensingState as string,
      deleteToken: deleteToken as string,
      contact: contact as string,
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
  data: Partial<
    Omit<ServiceWithAuthorRef, "author"> & {
      contact: string;
      category: string;
      imageDeleteToken?: string;
      license: string;
      licensingState: string;
      deleteToken: string;
    }
  >,
  authorEmail: string
) {
  try {
    // Get the existing service first
    const existingService = await client.fetch<ServiceWithAuthor | null>(
      `*[_type == "service" && _id == $serviceId][0]{
        _id,
        _type,
        title,
        description,
        category,
        image,
        license,
        licensingState,
        deleteToken,
        pitch,
        contact,
        "author": author->{
          _id,
          _type,
          email,
          name,
        }
      }`,
      { serviceId }
    );

    if (!existingService) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }

    // Check if the service's author email matches the provided email
    if (existingService.author.email !== authorEmail) {
      throw new Error(
        "Unauthorized: You don't have permission to edit this service"
      );
    }

    let updatedImageUrl = existingService.image;
    if (data.image && data.image !== existingService.image) {
      if (existingService.image) {
        try {
          const publicId = extractPublicIdFromUrl(existingService.image);
          if (publicId) {
            await deleteCloudinaryImage(publicId);
            console.log("Old image deleted from Cloudinary");
          }
        } catch (deleteError) {
          console.error(
            "Error deleting old image from Cloudinary:",
            deleteError
          );
        }
      }

      updatedImageUrl = data.image;
    }

    // Use the existing author reference for the update
    const updatedData: Partial<ServiceWithAuthorRef> & { deleteToken: string } =
      {
        title: data.title,
        description: data.description ?? existingService.description,
        category: data.category ?? existingService.category,
        image: updatedImageUrl,
        license: data.license ?? existingService.license,
        licensingState: data.licensingState ?? existingService.licensingState,
        deleteToken: data.deleteToken ?? existingService.deleteToken,
        pitch: data.pitch ?? existingService.pitch,
        contact: data.contact ?? existingService.contact,
      };

    const result = await writeClient.patch(serviceId).set(updatedData).commit();
    return result;
  } catch (error) {
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

    // Fetch and delete all ratings associated with the service
    const ratingIds = await client.fetch(
      `
      *[_type == "rating" && service._ref == $serviceId]._id
    `,
      { serviceId }
    );

    for (const ratingId of ratingIds) {
      await client.delete(ratingId);
    }

    const service = await client.fetch(
      `
      *[_type == "service" && _id == $serviceId][0]{
        _id,
        image,
        license,
        licensingState,
        deleteToken,
        author->{
          _id,
          email
        }
      }
    `,
      { serviceId }
    );

    if (!service) {
      throw new Error("Service not found");
    }

    if (!service.author) {
      throw new Error("Service author information not found");
    }

    if (service.author.email !== session.user.email) {
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

    revalidatePath("/");

    return {
      status: "SUCCESS",
      message: "Service deleted successfully",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
