import { defineQuery } from "next-sanity";

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current) && 
    (
      !defined($search) || 
      title match $search || 
      category match $search || 
      author->name match $search
    ) && 
    (
      !defined($category) || 
      category match $category
    )
  ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id,
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
      author->{
        _id,
        name,
        image,
        email
      },
      description,
      category,
      image,
      pitch,
      contact
    }`);

export const SERVICES_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "service" && author._ref == $id] | order(_createdAt desc){
      _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, 
    name, 
    image,
    email    // Added email field
  },
  description,
  category,
  image,
  deleteToken,  // Make sure this is included if you need it for mutations
  pitch
    }`);

export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    email,
    image,
    }`);

export const AUTHOR_BY_GOOGLE_ID_QUERY =
  defineQuery(`[_type == "author" && email == $email][0]{
      _id,
      id,
      name,
      email,
      image,
      "roles": roles[]->title
    }`);

export const AUTHOR_BY_EMAIL_QUERY =
  defineQuery(`*[_type == "author" && email == $email][0]{
      _id,
      name,
      email,
      image
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
      description,
      category,
      image,
      author-> {
        _id,
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

export const UPDATE_SERVICE_MUTATION =
  defineQuery(`*[_type == "service" && _id == $id]{
    _id,
    _type,
      title,
      description,
      category,
      image,
      pitch,
      }`);

export const DELETE_SERVICE_MUTATION = defineQuery(
  `*[_type == "service" && _id == $id]`
);
