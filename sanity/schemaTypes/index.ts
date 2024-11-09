import { type SchemaTypeDefinition } from "sanity";
import { service } from "@/sanity/schemaTypes/service";
import { author } from "@/sanity/schemaTypes/author";

export const schema = {
  types: [service, author] as SchemaTypeDefinition[],
};
