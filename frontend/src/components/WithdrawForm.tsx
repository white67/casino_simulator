import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import api from "../services/AuthService.tsx";
import { ACCESS_TOKEN } from "../services/constants.tsx";
import WithdrawSuccess from "./WithdrawSuccess.tsx";

const updateBalance = async (amount: number) => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      throw new Error("No token found");
    }

    await api.post(
      "api/balance/",
      {
        amount: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Balance updated successfully");
  } catch (error) {
    console.error("Error updating balance: ", error);
    throw error;
  }
};

interface WithdrawProps {
  open: boolean;
  onClose: () => void;
  onWithdraw: (withdrewAmount: number) => void;
}

const WithdrawForm: React.FC<WithdrawProps> = ({
  open,
  onClose,
  onWithdraw,
}) => {
  const [inputValue, setInputValue] = useState("");

  const [showWithdrawSuccessAlert, setShowWithdrawSuccessAlert] =
    useState(false); // State to control alert visibility
  const [withdrawedAmount, setWithdrawedAmount] = useState(0); // Winning amount state

  const handleSubmit = () => {
    console.log("Submitted value:", inputValue); // Logika wysyłania do bazy
    const value = parseInt(inputValue);
    updateBalance(-value);
    onClose();
    onWithdraw(value);
    setWithdrawedAmount(value);
    setShowWithdrawSuccessAlert(true);
  };

  return (
    <>
      <WithdrawSuccess
        amount={withdrawedAmount}
        open={showWithdrawSuccessAlert}
        onClose={() => setShowWithdrawSuccessAlert(false)}
      />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Withdraw</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Value"
            type="text"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WithdrawForm;
