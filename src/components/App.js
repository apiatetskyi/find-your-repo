import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Paper,
  LinearProgress,
} from "@material-ui/core";

import github from "../api/github";
import SearchBar from "./SearchBar";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },

  h1: {
    fontSize: theme.typography.pxToRem(28),
    fontWeight: theme.typography.fontWeightBold,
  },

  section: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
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

  /**
   * Fetch data from api by search phrase.
   *
   * @param {string} searchPhrase
   */
  const fetchData = async (searchPhrase) => {
    setLoading(true);
    window.history.pushState(
      null,
      null,
      `${window.location.pathname}?q=${searchPhrase}`
    );

    const resonse = await github.get("/search/repositories", {
      params: {
        q: searchPhrase,
      },
    });

    setRepositories(resonse.data.items);
    setTotalCount(resonse.data.total_count);
    setLoading(false);
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography className={classes.h1} variant="h1">
        Find your repo
      </Typography>

      <Paper className={classes.section}>
        <SearchBar onSubmit={fetchData} />
      </Paper>
      {loading && <LinearProgress />}

      <Paper className={classes.section}>
        <Typography className={classes.sectionHeading} variant="h2">
          Search results
          {!!totalCount && (
            <span className={classes.totalCount}>
              Total count: {totalCount}
            </span>
          )}
        </Typography>
        {repositories.map((repo) => (
          <Typography>{repo.name}</Typography>
        ))}
      </Paper>
    </Container>
  );
};

export default App;
