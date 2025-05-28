import { Button } from "@mui/material";

interface Props {
  outcomeNr: number;
}

const OutcomeEl = ({ outcomeNr }: Props) => {
  const number_color = {
    green: [0],
    red: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
    black: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
  };

  function get_color(num: number) {
    if (number_color["green"].includes(num)) {
      return "green";
    } else if (number_color["red"].includes(num)) {
      return "red";
    } else {
      return "black";
    }
  }

  return (
    <Button sx={{ color: "white", bgcolor: get_color(outcomeNr) }}>
      {outcomeNr}
    </Button>
  );
};

export default OutcomeEl;
