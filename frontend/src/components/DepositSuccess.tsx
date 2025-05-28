import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface DepositSuccessProps {
  amount: number;
  open: boolean;
  onClose: () => void;
}

const DepositSuccess: React.FC<DepositSuccessProps> = ({
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
        Successfully deposited ${amount}
      </Alert>
    </Snackbar>
  );
};

export default DepositSuccess;
