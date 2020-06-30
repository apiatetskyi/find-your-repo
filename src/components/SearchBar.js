import React, { useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = ({ onSubmit }) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  /**
   * Form submit handler.
   *
   * @param {Event} event
   */
  const onFormSubmit = async (event) => {
    event.preventDefault();
    onSubmit(searchPhrase);
    setSearchPhrase("");
  };

  /**
   * Input change handler.
   *
   * @param {Event} event
   */
  const onChange = (event) => {
    setSearchPhrase(event.target.value);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={onFormSubmit}>
      <Grid container spacing={2}>
        <Grid item sm={10}>
          <TextField
            label="Enter repository name"
            type="search"
            fullWidth
            variant="outlined"
            value={searchPhrase}
            onChange={onChange}
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
