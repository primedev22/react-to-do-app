import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const ErrorMessage = (props: any) => (
  <Snackbar
    open={props.message.length > 0}
    autoHideDuration={2000}
    onClose={props.onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <MuiAlert
      elevation={6}
      variant="filled"
      severity="error"
      onClose={props.onClose}
    >
      {props.message}
    </MuiAlert>
  </Snackbar>
);

export default ErrorMessage;
