import React from "react";
import { Button } from "@mui/material";

interface CustomSubmitButtonProps {
  onClickFun: () => void;
  label: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "text" | "outlined" | "contained";
  additionalStyles?: React.CSSProperties;
}

const CustomSubmitButton: React.FC<CustomSubmitButtonProps> = ({
  onClickFun,
  label,
  color = "primary",
  variant = "contained",
  additionalStyles,
}) => {
  return (
    <Button
      onClick={onClickFun}
      color={color}
      variant={variant}
      sx={{ ...additionalStyles, fontWeight: 500 }}
    >
      {label}
    </Button>
  );
};

export default CustomSubmitButton;
