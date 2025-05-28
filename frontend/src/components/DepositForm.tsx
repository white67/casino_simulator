import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import api from "../services/AuthService";
import { ACCESS_TOKEN } from "../services/constants.tsx";
import DepositSuccess from "./DepositSuccess.tsx";

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

interface DepositProps {
  open: boolean;
  onClose: () => void;
  onDeposit: (depositedAmount: number) => void;
}

const DepositForm: React.FC<DepositProps> = ({ open, onClose, onDeposit }) => {
  const [inputValue, setInputValue] = useState("");

  const [showDepositSuccessAlert, setShowDepositSuccessAlert] = useState(false); // State to control alert visibility
  const [depositedAmount, setDepositedAmount] = useState(0); // Winning amount state

  const handleSubmit = () => {
    console.log("Submitted value:", inputValue); // Logika wysyłania do bazy
    const value = parseInt(inputValue);
    updateBalance(value);
    onClose();
    onDeposit(value);
    setDepositedAmount(value);
    setShowDepositSuccessAlert(true);
  };

  return (
    <>
      <DepositSuccess
        amount={depositedAmount}
        open={showDepositSuccessAlert}
        onClose={() => setShowDepositSuccessAlert(false)}
      />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Deposit</DialogTitle>
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
            Deposit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DepositForm;
