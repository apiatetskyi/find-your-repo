import { useState, useCallback } from "react";
import ReactDOM from "react-dom";

const useFetch = (api, path) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState();

  const fetchData = useCallback(
    async (params) => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const response = await api.get(path, { params });

        ReactDOM.unstable_batchedUpdates(() => {
          setResponse(response.data);
          setLoading(false);
        });
      } catch (error) {
        switch (error.response.status) {
          case 403:
            setErrorMessage(
              "You exceeded rate limit 30 request per minute. Please try again later."
            );
            break;
          case 422:
            setErrorMessage(
              "Only the first 1000 search results are available."
            );
            break;
          default: {
            setErrorMessage(
              "Oops! Something went wrong. Please try again later."
            );
          }
        }
        setLoading(false);
      }
    },
    [api, path]
  );

  return { response, errorMessage, loading, fetchData };
};

export default useFetch;
