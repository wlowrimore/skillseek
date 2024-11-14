"use client";
import { LoginMethod } from "sanity";
import type { SanityDocument, User } from "@sanity/types";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

interface AccessControlContext {
  document: SanityDocument;
  identity: User | null;
}

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  auth: {
    loginMethod: "jwt" as LoginMethod,
  },
  accessControl: {
    rules: [
      {
        operation: "read",
        allow: true,
      },
      {
        operation: "create",
        allow: ({ identity }: AccessControlContext) => {
          return identity !== null;
        },
        permission: "create",
      },
      {
        operation: "update",
        allow: ({ document, identity }: AccessControlContext) => {
          return (
            (document?.author as { _ref: string })?._ref ===
            `author-${identity?.email}`
          );
        },
        permission: "update",
      },
      {
        operation: "delete",
        allow: ({ document, identity }: AccessControlContext) => {
          return (
            (document?.author as { _ref: string })?._ref ===
            `author-${identity?.email}`
          );
        },
        permission: "delete",
      },
    ],
  },
});
