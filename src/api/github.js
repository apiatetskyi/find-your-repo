import axios from "axios";

const DEFAULT_PER_PAGE = 30;

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
