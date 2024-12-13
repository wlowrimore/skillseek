import { type SchemaTypeDefinition } from "sanity";
import { service } from "./service";
import { author } from "./author";
import { playlist } from "./playlist";
import { role } from "./role";
import { category } from "./category";

export const schema = {
  types: [service, author, category, playlist, role] as SchemaTypeDefinition[],
};
