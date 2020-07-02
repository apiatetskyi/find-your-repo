import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import RepositoryCard from "./RepositoryCard";

const RepositoryList = React.memo(({ repositories }) => {
  return (
    <Grid container spacing={2}>
      {repositories.map((repo) => (
        <Grid key={repo.id} item xs={12} sm={6} md={4} lg={2}>
          <RepositoryCard repository={repo} />
        </Grid>
      ))}
    </Grid>
  );
});

RepositoryList.propTypes = {
  repositories: PropTypes.array.isRequired,
};

export default RepositoryList;
