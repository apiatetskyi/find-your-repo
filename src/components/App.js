import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";

import github from "../api/github";
import { defaultUrlParam, sortingOptions } from "../settings";
import { getPagesAmount } from "../utils";

import useFetch from "../hooks/useFetch";
import useUrlParams from "../hooks/useUrlParams";

import SearchBar from "./SearchBar";
import Sorting from "./Sorting";
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
  const { params, updateParams } = useUrlParams(defaultUrlParam);
  const { loading, response, errorMessage, fetchData } = useFetch(
    github,
    "/search/repositories"
  );

  useEffect(() => {
    if (params.q) {
      fetchData(params);
    }
  }, [params]);

  const onSearch = (searchPhrase) => {
    updateParams({ q: searchPhrase, page: 1 });
  };

  const onSorting = (order) => {
    updateParams({ order: order, page: 1 });
  };

  const onPageChange = (page) => {
    updateParams({ page });
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      {errorMessage && (
        <Alert className={classes.alert} severity="warning">
          {errorMessage}
        </Alert>
      )}

      <Typography className={classes.h1} variant="h1">
        Find your repo
      </Typography>

      <Paper className={`${classes.paper} ${classes.section}`}>
        <SearchBar onSubmit={onSearch} value={params.q || ""} />
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
        </div>
      )}
    </Container>
  );
};

export default App;
