import { defineField, defineType } from "sanity";

export const ratingKey = defineType({
  name: "ratingKey",
  title: "Rating Key",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "key",
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "reference",
      to: [{ type: "service" }],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "serviceProvider",
      title: "Service Provider",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "isUsed",
      title: "Is Used",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
