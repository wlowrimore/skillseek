export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const useCdn = false;

// Make sure you're using NEXT_PUBLIC_ prefix for client-side variables
export const studioUrl = "/studio";

// export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || "2024-11-09";

// export const dataset = assertValue(
//   process.env.SANITY_STUDIO_DATASET,
//   "Missing environment variable: SANITY_STUDIO_DATASET"
// );

// export const projectId = assertValue(
//   process.env.SANITY_STUDIO_PROJECT_ID,
//   "Missing environment variable: SANITY_STUDIO_PROJECT_ID"
// );

// export const studioAPIToken = assertValue(
//   process.env.SANITY_STUDIO_API_TOKEN,
//   "Missing environment variable: SANITY_STUDIO_API_TOKEN"
// )

// export const token = assertValue(
//   process.env.SANITY_STUDIO_WRITE_TOKEN,
//   "Missing environment variable: SANITY_STUDIO_WRITE_TOKEN"
// );

// function assertValue<T>(v: T | undefined, errorMessage: string): T {
//   if (v === undefined) {
//     throw new Error(errorMessage);
//   }

//   return v;
// }
