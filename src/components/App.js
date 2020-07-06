import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import github from "../api/github";
import { defaultUrlParam, SEARCH_CACHE } from "../settings";
import { searchParamsToObject, paramsToQueryString } from "../utils";

import useFetch from "../hooks/useFetch";
import useUrlParams from "../hooks/useUrlParams";
import useCache from "../hooks/useCache";

import { OnlineContext } from "../context/online-context";

import SearchBar from "./SearchBar";
import Select from "./Select";
import NetworkNotification from "./NetworkNotification";
import SearchResult from "./SearchResult";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },

  h1: {
    fontSize: theme.typography.pxToRem(28),
    fontWeight: theme.typography.fontWeightBold,
  },

  paper: {
    padding: theme.spacing(2),
  },

  section: {
    marginTop: theme.spacing(3),
  },

  loading: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  alert: {
    marginBottom: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyle();
  const [cachedRequests, setCachedRequests] = useState([]);
  const { params, updateParams } = useUrlParams(defaultUrlParam);
  const { getCache, addCache, getAllCaches } = useCache(SEARCH_CACHE);
  const { loading, response, errorMessage, fetchData, setResponse } = useFetch(
    github,
    "/search/repositories"
  );
  const { isOnline } = useContext(OnlineContext);

  useEffect(() => {
    const searchQuery = paramsToQueryString(params);

    (async () => {
      const cache = await getCache(searchQuery);

      if (cache) {
        setResponse(cache.data);
      }

      if (params.q && isOnline) {
        const fetchedData = await fetchData(params);

        if (fetchedData) {
          addCache(searchQuery, fetchedData);
        }
      }
    })();
  }, [params]);

  useEffect(() => {
    getAllCaches().then((requests) => {
      setCachedRequests(
        requests.map((request) => {
          const url = new URL(request.url);
          const page = url.searchParams.get("page");
          const order = url.searchParams.get("order");
          const query = url.searchParams.get("q");

          return {
            value: url.searchParams.toString(),
            label: `${query} (page: ${page}; order: ${order})`,
            request: request,
          };
        })
      );
    });
  }, [isOnline]);

  const onSearch = (searchPhrase) => {
    updateParams({ q: searchPhrase, page: 1 });
  };

  const onSorting = (order) => {
    updateParams({ order: order, page: 1 });
  };

  const onPageChange = (page) => {
    updateParams({ page });
  };

  const onSearchRequestSelect = (event) => {
    updateParams(searchParamsToObject(new URLSearchParams(event.target.value)));
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      {errorMessage && (
        <Alert className={classes.alert} severity="warning">
          {errorMessage}
        </Alert>
      )}

      <NetworkNotification hasCache={cachedRequests.length} />

      <Typography className={classes.h1} variant="h1">
        Find your repo
      </Typography>

      <Paper className={`${classes.paper} ${classes.section}`}>
        {isOnline && <SearchBar onSubmit={onSearch} value={params.q || ""} />}
        {!isOnline && (
          <Select
            label="Previous search requests"
            onChange={onSearchRequestSelect}
            options={cachedRequests}
          />
        )}
      </Paper>

      {loading && (
        <Backdrop className={classes.loading} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {!!response.items && (
        <div className={classes.section}>
          <SearchResult
            onPaging={onPageChange}
            onSorting={onSorting}
            response={response}
            currentPage={params.page}
          />
        </div>
      )}
    </Container>
  );
};

export default App;
