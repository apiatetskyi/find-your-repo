import { useState } from "react";

const parseUrlParams = () => {
  const params = new URLSearchParams(window.location.search);

  return [...params.entries()].reduce((params, [key, value]) => {
    params[key] = value;
    return params;
  }, {});
};

const isSameParams = (prevParams, params) => {
  return Object.keys(params).every(
    (param) => params[param] === prevParams[param]
  );
};

const useUrlParams = (defaultParams) => {
  const [params, setParams] = useState({
    ...parseUrlParams(),
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
