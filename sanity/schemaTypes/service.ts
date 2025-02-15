import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      description: "The author who created this service",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.min(10).max(100),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "license",
      title: "License",
      type: "string",
    }),
    defineField({
      name: "licensingState",
      title: "Licensing State",
      type: "string",
    }),
    defineField({
      name: "deleteToken",
      title: "Delete Token",
      type: "string",
    }),
    defineField({
      name: "pitch",
      title: "Pitch",
      type: "text",
      description: "Briefly describe your services and how you can help others",
      validation: (Rule) => Rule.required().min(20).max(1000),
    }),
    defineField({
      name: "contact",
      title: "Contact Email",
      type: "email",
      description: "Contact email for this service",
      validation: (Rule) => Rule.required().error("Contact email is required"),
    }),
  ],
});
