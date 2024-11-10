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

export const SERVICE_BY_ID_QUERY =
  defineQuery(`*[_type == "service" && _id == $id][0]{
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
    pitch,
    }`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    select[]->{
      _id,
      _createdAt,
      title,
      slug,
      author-> {
        name,
        slug,
        image,
        email
        }},
        description,
        category,
        image,
        pitch,
    }`);
