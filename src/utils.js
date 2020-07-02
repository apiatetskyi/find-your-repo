import { MAX_SEARCH_RESULTS } from "./api/github";

export const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get(param);
};

export const getPagesAmount = (items, perPage) =>
  Math.ceil(Math.min(MAX_SEARCH_RESULTS, items) / perPage);
