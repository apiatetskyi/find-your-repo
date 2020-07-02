import React, { useState } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = React.memo(({ onSubmit, value = "" }) => {
  const [searchPhrase, setSearchPhrase] = useState(value);

  const onFormSubmit = (event) => {
    event.preventDefault();
    searchPhrase && onSubmit(searchPhrase);
  };

  const onChange = (event) => {
    setSearchPhrase(event.target.value);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={onFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={10}>
          <TextField
            label="Enter repository name"
            type="search"
            helperText={""}
            fullWidth
            variant="outlined"
            value={searchPhrase}
            onChange={onChange}
          />
        </Grid>
        <Grid item sm={3} md={2} container alignItems="stretch">
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
});

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  value: PropTypes.string,
};

export default SearchBar;
