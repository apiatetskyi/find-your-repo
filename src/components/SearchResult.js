import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

import { defaultUrlParam, sortingOptions } from "../settings";
import { getPagesAmount } from "../utils";

import { OnlineContext } from "../context/online-context";

import Sorting from "./Sorting";
import RepositoryList from "./RepositoryList";

const useStyle = makeStyles((theme) => ({
  sectionHeading: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
  },

  pagination: {
    marginTop: theme.spacing(2),
  },

  sorting: {
    float: "right",
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SearchResult = ({
  onPaging = () => {},
  onSorting = () => {},
  currentPage = 1,
  response = [],
}) => {
  const classes = useStyle();
  const { isOnline } = useContext(OnlineContext);
  const pageCount = getPagesAmount(
    response.total_count,
    defaultUrlParam.per_page
  );

  return response.total_count > 0 ? (
    <>
      <div className={classes.sorting}>
        <Sorting options={sortingOptions} onChange={onSorting} />
      </div>

      <Typography className={classes.sectionHeading} variant="h2">
        Search results
      </Typography>

      <RepositoryList repositories={response.items} />

      {isOnline && pageCount > 1 && (
        <Pagination
          className={classes.pagination}
          onChange={(event, page) => {
            onPaging(page);
          }}
          count={getPagesAmount(response.total_count, defaultUrlParam.per_page)}
          color="primary"
          page={parseInt(currentPage, 10) || 1}
        />
      )}
    </>
  ) : (
    <>
      <Typography className={classes.sectionHeading} variant="h2">
        Nothing found
      </Typography>
    </>
  );
};

export default SearchResult;
