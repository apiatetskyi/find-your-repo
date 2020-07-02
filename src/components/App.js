import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

import github from "../api/github";
import { defaultUrlParam, sortingOptions } from "../settings";

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

  info: {
    display: "flex",
    alignItems: "center",
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
    updateParams({ q: searchPhrase });
  };

  const onSorting = (order) => {
    updateParams({ order: order });
  };

  return (
    <Container className={classes.container} maxWidth="md">
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
      {loading && <LinearProgress />}

      {!!response.items && (
        <div className={classes.section}>
          <Typography className={classes.sectionHeading} variant="h2">
            Search results
            <span className={classes.info}>
              <Sorting options={sortingOptions} onChange={onSorting} />
              Total count: {response.total_count}
            </span>
          </Typography>
          <RepositoryList repositories={response.items} />
        </div>
      )}
    </Container>
  );
};

export default App;
