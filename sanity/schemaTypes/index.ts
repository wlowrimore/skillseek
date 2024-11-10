import { type SchemaTypeDefinition } from "sanity";
import { service } from "@/sanity/schemaTypes/service";
import { author } from "@/sanity/schemaTypes/author";
import { playlist } from "@/sanity/schemaTypes/playlist";

export const schema = {
  types: [service, author, playlist] as SchemaTypeDefinition[],
};
