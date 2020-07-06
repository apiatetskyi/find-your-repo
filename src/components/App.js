import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";

import github from "../api/github";
import { defaultUrlParam, sortingOptions, SEARCH_CACHE } from "../settings";
import {
  getPagesAmount,
  searchParamsToObject,
  paramsToQueryString,
} from "../utils";

import useFetch from "../hooks/useFetch";
import useUrlParams from "../hooks/useUrlParams";
import useCache from "../hooks/useCache";

import { OnlineContext } from "../context/online-context";

import SearchBar from "./SearchBar";
import Sorting from "./Sorting";
import Select from "./Select";
import RepositoryList from "./RepositoryList";

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

  sectionHeading: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
  },

  pagination: {
    marginTop: theme.spacing(2),
  },

  loading: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  sorting: {
    float: "right",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
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
    getAllCaches();

    (async () => {
      const cache = await getCache(searchQuery);

      if (!isOnline) {
        return;
      }

      if (cache) {
        setResponse(cache.data);
      } else if (params.q) {
        const fetchedData = await fetchData(params);

        if (fetchedData) {
          addCache(searchQuery, fetchedData);
        }
      }
    })();
  }, [params, isOnline]);

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

      {!isOnline && (
        <Alert className={classes.alert} severity="warning">
          You are working in offline mode. Only previous 10 search requests are
          available.
        </Alert>
      )}

      <Typography className={classes.h1} variant="h1">
        Find your repo
      </Typography>

      <Paper className={`${classes.paper} ${classes.section}`}>
        {isOnline ? (
          <SearchBar onSubmit={onSearch} value={params.q || ""} />
        ) : (
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
          <div className={classes.sorting}>
            <Sorting options={sortingOptions} onChange={onSorting} />
          </div>
          <Typography className={classes.sectionHeading} variant="h2">
            Search results
          </Typography>
          <RepositoryList repositories={response.items} />
          {isOnline && (
            <Pagination
              className={classes.pagination}
              onChange={(event, page) => {
                onPageChange(page);
              }}
              count={getPagesAmount(
                response.total_count,
                defaultUrlParam.per_page
              )}
              color="primary"
              page={parseInt(params.page, 10) || 1}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default App;
