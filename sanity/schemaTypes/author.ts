import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "Author ID (email)",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
