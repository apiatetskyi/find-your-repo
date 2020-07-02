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
        setErrorMessage("Oops! Something went wrong. Please try again later.");
        setLoading(false);
      }
    },
    [api, path]
  );

  return { response, errorMessage, loading, fetchData };
};

export default useFetch;
