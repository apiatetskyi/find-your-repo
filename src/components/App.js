import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Paper } from "@material-ui/core";

import SearchBar from "./SearchBar";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },

  h1: {
    fontSize: theme.typography.pxToRem(28),
    fontWeight: 700,
  },

  section: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },

  sectionHeading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
  },
}));

const App = () => {
  const classes = useStyle();

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography className={classes.h1} variant="h1">
        Find your repo
      </Typography>
      <Paper className={classes.section}>
        <SearchBar />
      </Paper>
      <Paper className={classes.section}>
        <Typography className={classes.sectionHeading} variant="h2">
          Search results
        </Typography>
      </Paper>
    </Container>
  );
};

export default App;
