import { client } from "@/sanity/lib/client";

export async function getServiceData(id: string) {
  const service = await client.fetch(
    `*[_type == "service" && _id == $id][0]{
      ...,
      "ratings": *[_type == "rating" && service._ref == ^._id]{
        _id,
        rating,
        review,
        createdAt,
        "user": user->{
          _id,
          name,
          image
        }
      }
    }`,
    { id }
  );
  return service;
}
