import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CustomOutcomeElProps {
  label: string;
  colorType: "red" | "black" | "green";
  additionalStyles?: React.CSSProperties;
  isLast?: boolean;
}

const CustomOutcomeEl: React.FC<CustomOutcomeElProps> = ({
  label,
  colorType,
  additionalStyles,
  isLast,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...additionalStyles,
        bgcolor: theme.rul_num_color[colorType],
        border: `2px solid ${
          isLast ? "gold" : theme.rul_num_color[`${colorType}_light`]
        }`,
        fontWeight: 600,
        borderRadius: "50%",
        aspectRatio: "1/1",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {label}
    </Box>
  );
};

export default CustomOutcomeEl;
