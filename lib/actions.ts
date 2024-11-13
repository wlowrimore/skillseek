"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

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

export async function updateService(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const updatedData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: formData.get("image"),
      pitch: formData.get("pitch"),
    };

    await client.patch(id).set(updatedData).commit();

    revalidatePath("/");
    revalidatePath(`/service/${id}`);

    return {
      status: "SUCCESS",
      message: "Service updated successfully",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Failed to update service",
    };
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
