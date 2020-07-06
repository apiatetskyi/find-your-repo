import { DEFAULT_PER_PAGE } from "./api/github";

export const SEARCH_CACHE = "search-cache";

export const defaultUrlParam = {
  per_page: DEFAULT_PER_PAGE,
  sort: "stars",
  order: "desc",
};

export const sortingOptions = [
  { label: "DESC", order: "desc" },
  { label: "ASC", order: "asc" },
];
