import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface WithdrawSuccessProps {
  amount: number;
  open: boolean;
  onClose: () => void;
}

const WithdrawSuccess: React.FC<WithdrawSuccessProps> = ({
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
        Successfully withdrew ${amount}
      </Alert>
    </Snackbar>
  );
};

export default WithdrawSuccess;
