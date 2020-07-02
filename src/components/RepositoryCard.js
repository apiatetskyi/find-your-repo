import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconStars from "@material-ui/icons/Stars";
import IconGithub from "@material-ui/icons/GitHub";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  content: {
    padding: theme.spacing(1),
  },
  stars: {
    position: "absolute",
    bottom: theme.spacing(1.5),
    right: theme.spacing(1),

    display: "flex",
    alignItems: "center",
    maxWidth: theme.typography.pxToRem(60),

    fontSize: theme.typography.pxToRem(12),
  },
  starsIcon: {
    marginRight: theme.spacing(0.25),
  },
}));

const RepositoryCard = React.memo(({ repository }) => {
  const classes = useStyles();
  const { html_url: url, name, owner, stargazers_count } = repository;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography color="primary" noWrap>
          {name}
        </Typography>

        <Typography className={classes.stars}>
          <IconStars className={classes.starsIcon} fontSize="small" />
          {stargazers_count}
        </Typography>

        <Typography color="textSecondary" variant="caption">
          Author: {owner.login}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          href={url}
          size="small"
          target="_blank"
          endIcon={<IconGithub />}
        >
          View on
        </Button>
      </CardActions>
    </Card>
  );
});

RepositoryCard.propTypes = {
  repository: PropTypes.object.isRequired,
};

export default RepositoryCard;
