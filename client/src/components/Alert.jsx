import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles(styles);

const CustomizedSnackbars = () => {
  const { alerts } = useSelector((state) => {
    return {
      alerts: state.alert,
    };
  }, shallowEqual);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert, i) => (
          <Snackbar
            key={i}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={alert.alertType}>
              {alert.msg}
            </Alert>
          </Snackbar>
        ))}
    </div>
  );
};
export default CustomizedSnackbars;
