import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CustomBetButtonProps {
  onClickFun: () => void;
  label: string;
  colorType: "red" | "black" | "green";
  additionalStyles?: React.CSSProperties;
}

const CustomBetButton: React.FC<CustomBetButtonProps> = ({
  onClickFun,
  label,
  colorType,
  additionalStyles,
}) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClickFun}
      variant="contained"
      color="primary"
      sx={{
        ...additionalStyles,
        bgcolor: theme.rul_num_color[colorType],
        border: `2px solid ${theme.rul_num_color[`${colorType}_light`]}`,
        "&:hover": {
          bgcolor: theme.rul_num_color[`${colorType}_light`],
        },
        fontWeight: 600,
        width: "100%",
      }}
    >
      {label}
    </Button>
  );
};

export default CustomBetButton;
