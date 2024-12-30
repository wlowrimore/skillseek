import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("provider").title("Service Providers"),
      S.documentTypeListItem("playlist").title("Playlists"),
      S.documentTypeListItem("rating").title("Ratings"),
      S.documentTypeListItem("ratingKey").title("Rating Keys"),
      S.documentTypeListItem("role").title("Roles"),
      S.documentTypeListItem("category").title("Categories"),
    ]);
