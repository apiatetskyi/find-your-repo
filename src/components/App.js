import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

import github from "../api/github";
import SearchBar from "./SearchBar";
import RepositoryList from "./RepositoryList";
import { getQueryParam } from "../utils";

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
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
  },

  totalCount: {
    float: "right",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const App = () => {
  const classes = useStyle();

  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [repositories, setRepositories] = useState([]);
  const [order, setOrder] = useState("desc");

  /**
   * Fetch data from api by search phrase.
   */
  const fetchData = async (searchPhrase) => {
    setLoading(true);
    window.history.pushState(
      null,
      null,
      `${window.location.pathname}?q=${searchPhrase}`
    );

    const response = await github.get("/search/repositories", {
      params: {
        q: searchPhrase,
        sort: "stars",
        order,
      },
    });

    ReactDOM.unstable_batchedUpdates(() => {
      setRepositories(response.data.items);
      setTotalCount(response.data.total_count);
      setLoading(false);
    });
  };

  useEffect(() => {
    const searchPhrase = getQueryParam("q");
    searchPhrase && fetchData(searchPhrase);
  }, []);

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography className={classes.h1} variant="h1">
        Find your repo
      </Typography>

      <Paper className={`${classes.paper} ${classes.section}`}>
        <SearchBar onSubmit={fetchData} value={getQueryParam("q") || ""} />
      </Paper>
      {loading && <LinearProgress />}

      {!!repositories.length && (
        <div className={classes.section}>
          <Typography className={classes.sectionHeading} variant="h2">
            Search results
            <span className={classes.totalCount}>
              Total count: {totalCount}
            </span>
          </Typography>
          <RepositoryList repositories={repositories} />
        </div>
      )}
    </Container>
  );
};

export default App;
