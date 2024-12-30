import { defineField, defineType } from "sanity";

export const provider = defineType({
  name: "provider",
  title: "Provider",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    // defineField({
    //   name: "Title",
    //   title: "title",
    //   type: "title",
    //   options: {
    //     source: "name",
    //   },
    // }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
