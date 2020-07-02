import axios from "axios";

export const DEFAULT_PER_PAGE = 30;
export const MAX_SEARCH_RESULTS = 1000;

/**
 * Create configured instance of axios for github api.
 */
const github = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API,
});

github.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.per_page = DEFAULT_PER_PAGE;

  return config;
});

export default github;
