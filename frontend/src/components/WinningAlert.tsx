import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface WinningAlertProps {
  amount: number;
  open: boolean;
  onClose: () => void;
}

const WinningAlert: React.FC<WinningAlertProps> = ({
  amount,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        You've won ${amount}
      </Alert>
    </Snackbar>
  );
};

export default WinningAlert;
