import { MAX_SEARCH_RESULTS } from "./api/github";

export const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get(param);
};

export const paramsToQueryString = (params) => {
  const searchParams = new URLSearchParams(params).toString();

  return `${window.location.pathname}?${searchParams}`;
};

export const searchParamsToObject = (urlSearchParams) =>
  [...urlSearchParams.entries()].reduce((params, [key, value]) => {
    params[key] = value;
    return params;
  }, {});

export const getPagesAmount = (items, perPage) =>
  Math.ceil(Math.min(MAX_SEARCH_RESULTS, items) / perPage);
