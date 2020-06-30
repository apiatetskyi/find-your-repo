import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = (props) => {
  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item sm={10}>
          <TextField
            id="standard-search"
            label="Enter repository name"
            type="search"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item sm={2} container alignItems="stretch">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            endIcon={<SearchIcon />}
          >
            Find
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBar;
