import { useState } from "react";

import { searchParamsToObject } from "../utils";

const isSameParams = (prevParams, params) => {
  return Object.keys(params).every(
    (param) => params[param] === prevParams[param]
  );
};

const useUrlParams = (defaultParams) => {
  const [params, setParams] = useState({
    ...searchParamsToObject(new URLSearchParams(window.location.search)),
    ...defaultParams,
  });

  const updateParams = (params) => {
    setParams((prevParams) => {
      if (isSameParams(prevParams, params)) {
        return prevParams;
      }

      const newParams = { ...prevParams, ...params };
      const queryString = new URLSearchParams(Object.entries(newParams));

      window.history.pushState(
        { params: newParams },
        null,
        `${window.location.pathname}?${queryString.toString()}`
      );

      return newParams;
    });
  };

  return { params, updateParams };
};

export default useUrlParams;
