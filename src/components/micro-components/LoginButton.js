import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function OutlinedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          style={{
            color: "white",
            textDecoration: "none",
            border: "2px solid white",
            fontSize: "22px"
          }}
        >
          Login
        </Button>
      </Link>
    </div>
  );
}
