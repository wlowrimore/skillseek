import { defineType } from "sanity";

export const role = defineType({
  name: "role",
  title: "Role",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
});
