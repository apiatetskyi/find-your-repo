import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Alert from "@material-ui/lab/Alert";

import { OnlineContext } from "../context/online-context";

const useStyle = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(3),
  },
}));

const NetworkNotification = ({ hasCache = false }) => {
  const classes = useStyle();
  const { isOnline } = useContext(OnlineContext);

  let content;

  if (!isOnline && !hasCache) {
    content = (
      <Alert className={classes.alert} severity="error">
        Please check your internet connection.
      </Alert>
    );
  } else if (!isOnline) {
    content = (
      <Alert className={classes.alert} severity="warning">
        You are working in offline mode. Only previous 10 search requests are
        available.
      </Alert>
    );
  } else {
    content = null;
  }

  return content;
};

export default NetworkNotification;
