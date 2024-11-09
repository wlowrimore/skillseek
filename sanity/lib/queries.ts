import { defineQuery } from "next-sanity";

export const SERVICES_QUERY =
  defineQuery(`*[_type == "service" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) 
    {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      name,
      image,
      email
    },
    description,
    category,
    image,
    }`);
