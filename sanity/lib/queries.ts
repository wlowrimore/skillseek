import { defineQuery } from "next-sanity";
import { createClient } from "@sanity/client";

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
    license,
    licensingState,
    contact,
    pitch,
    "ratings": *[_type == "rating" && service._ref == ^._id] {
      _id,
      rating,
      review,
      createdAt,
      user-> {
        _id,
        name,
        image
      }
    }
  }`);

export const SERVICES_WITHOUT_SEARCH = defineQuery(`
  *[_type == "service" && (_id == $id || !defined($serviceId)) &&
    (
      !defined($serviceId) ||
      serviceId match $serviceId
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
    license,
    licensingState,
    contact,
    pitch,
    "ratings": *[_type == "rating" && service._ref == ^._id] {
      _id,
      rating,
      review,
      createdAt,
      user-> {
        _id,
        name,
        image
      }
    }
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
      license,
      licensingState,
      pitch,
      contact
    }`);

export const SERVICE_BY_RATING_KEY_QUERY =
  defineQuery(`*[_type == "ratingKey" && service._ref == $id][0]{
      service->{
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
      }
      _id,
      title,
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

export const RATINGS_BY_SERVICE_QUERY =
  defineQuery(`*[_type == "rating" && service._ref == $id] | order(_createdAt desc){
      _id,
      rating,
      review,
      createdAt,
      user-> {
        _id,
        name,
        image
      }
    }`);

export const SERVICES_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "service" && author._ref == $authorId] | order(_createdAt desc){
      _id,
  title,
  description,
  category,
  author->{
   _id,
    name,
    image,
    email
  },
  slug,
  _createdAt,
  ratings,
  license,
  licensingState,
  image,
  deleteToken,  // Make sure this is included if you need it for mutations
  pitch,
  contact
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
      "roles": roles[]->{
      code
      }
    }`);

export const VERIFY_USER_REFERENCES =
  defineQuery(`*[_type == "author" && _id == $userId]{
    _id,
    name,
    email,
    roles[]->{
      code}
  }`);

export const AUTHOR_BY_EMAIL_QUERY =
  defineQuery(`*[_type == "author" && email == $email][0]{
      _id,
      name,
      email,
      image
    }`);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
      *[_type == "playlist" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        license,
        licensingState,
        description,
        category,
        image,
        pitch,
        "ratings": *[_type == "rating" && service._ref == ^._id] {
          _id,
          rating,
          review,
          createdAt,
          user-> {
            _id,
            name,
            image
          }
        },
        "select": select[]->{
          _id,
          _createdAt,
          title,
          slug,
          description,
          category,
          image,
          license,
          licensingState,
          "ratings": *[_type == "rating" && service._ref == ^._id] {
          _id,
          rating,
          review,
          createdAt,
          user-> {
            _id,
            name,
            image
          }
        },
          author-> {
            _id,
            name,
            slug,
            image,
            email
          }
        }
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

// -----------------------------------------------------------------------------
//                                RATING QUERIES
// -----------------------------------------------------------------------------

export const CURRENT_USER_RATING_QUERY = defineQuery(`
  *[_type == "rating" && 
    service._ref == $serviceId && 
    user._ref == $userId
  ][0]{
    _id,
    rating,
    comment,
    createdAt,
    user->{
      _id,
      name,
      image
    }
  }`);

// Get all ratings for a service
export const SERVICE_RATINGS_QUERY = defineQuery(`
  *[_type == "rating" && service._ref == $serviceId] | order(createdAt desc) {
    _id,
    rating,
    comment,
    createdAt,
    user->{
      _id,
      name,
      image
    }
  }`);

// Verify rating key
export const VERIFY_RATING_KEY_QUERY = defineQuery(`
  *[_type == "ratingKey" && 
    key == $key && 
    service._ref == $serviceId && 
    serviceProvider._ref == $providerId && 
    !isUsed && 
    dateTime(expiresAt) > dateTime(now())
  ][0]{
    _id,
    key,
    user->{
      _id,
      name,
      email
    },
    service->{
      _id,
      title
    },
    serviceProvider->{
      _id,
      name
    }
  }`);

// Get rating statistics for a service
export const SERVICE_RATING_STATS_QUERY = defineQuery(`{
  "totalRatings": count(*[_type == "rating" && service._ref == $serviceId]),
  "averageRating": avg(*[_type == "rating" && service._ref == $serviceId].rating),
  "ratingDistribution": {
    "5": count(*[_type == "rating" && service._ref == $serviceId && rating == 5]),
    "4": count(*[_type == "rating" && service._ref == $serviceId && rating == 4]),
    "3": count(*[_type == "rating" && service._ref == $serviceId && rating == 3]),
    "2": count(*[_type == "rating" && service._ref == $serviceId && rating == 2]),
    "1": count(*[_type == "rating" && service._ref == $serviceId && rating == 1])
  }
}`);

// Get active rating keys for a user
export const USER_ACTIVE_RATING_KEYS_QUERY = defineQuery(`
  *[_type == "ratingKey" && 
    user._ref == $userId && 
    !isUsed && 
    dateTime(expiresAt) > dateTime(now())
  ] | order(createdAt desc) {
    _id,
    key,
    createdAt,
    expiresAt,
    service->{
      _id,
      title
    },
    serviceProvider->{
      _id,
      name
    }
  }`);

// Get service provider's received ratings
export const PROVIDER_RATINGS_QUERY = defineQuery(`
  *[_type == "rating" && 
    serviceProvider._ref == $providerId
  ] | order(createdAt desc) {
    _id,
    rating,
    comment,
    createdAt,
    service->{
      _id,
      title
    },
    user->{
      _id,
      name,
      image
    }
  }`);

// Example usage in your API route:
// api/ratings/route.ts
export async function fetchServiceRatings(serviceId: string, userId?: string) {
  const client = createClient({
    // your Sanity client config
  });

  const [ratings, stats, currentUserRating] = await Promise.all([
    client.fetch(SERVICE_RATINGS_QUERY, { serviceId }),
    client.fetch(SERVICE_RATING_STATS_QUERY, { serviceId }),
    userId
      ? client.fetch(CURRENT_USER_RATING_QUERY, { serviceId, userId })
      : null,
  ]);

  return {
    ratings,
    stats,
    currentUserRating,
  };
}
