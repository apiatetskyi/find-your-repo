import { useState, useCallback } from "react";
import ReactDOM from "react-dom";

const setError = (status) => {
  const mapStatusToError = {
    403: "You exceeded rate limit 30 request per minute. Please try again later.",
    422: "Only the first 1000 search results are available.",
    default: "Oops! Something went wrong. Please try again later.",
  };

  return mapStatusToError[status] || mapStatusToError.default;
};

const useFetch = (api, path) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState();

  const fetchData = useCallback(
    async (params) => {
      setLoading(true);
      setErrorMessage(null);
      if (window.navigator.onLine) {
        try {
          const response = await api.get(path, { params });

          ReactDOM.unstable_batchedUpdates(() => {
            setResponse(response.data);
            setLoading(false);
          });

          return response;
        } catch (error) {
          setErrorMessage(setError(error.response.status));
          setLoading(false);
        }
      }
    },
    [api, path]
  );

  return { response, errorMessage, loading, fetchData, setResponse };
};

export default useFetch;
