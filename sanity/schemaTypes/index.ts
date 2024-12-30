import { type SchemaTypeDefinition } from "sanity";
import { service } from "./service";
import { provider } from "./provider";
import { author } from "./author";
import { playlist } from "./playlist";
import { role } from "./role";
import { category } from "./category";
import { rating } from "./rating";
import { ratingKey } from "./ratingKey";

export const schema = {
  types: [
    service,
    provider,
    author,
    category,
    playlist,
    role,
    rating,
    ratingKey,
  ] as SchemaTypeDefinition[],
};
