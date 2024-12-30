import { createClient } from "next-sanity";

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-20",
  useCdn: false,
  token: process.env.SANITY_STUDIO_WRITE_TOKEN,
});

// import { createClient } from "next-sanity";
// import { apiVersion, dataset, projectId } from "../env";

// export const writeClient = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: false,
//   token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
// });

// if (!writeClient.config().token) {
//   throw new Error("Write token not found.");
// }
