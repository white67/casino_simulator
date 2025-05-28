import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormControl } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { FormHelperText } from "@mui/material";
import CustomSubmitButton from "./CustomSubmitButton";
import CustomBetButton from "./CustomBetButton";
import { useTheme } from "@mui/material/styles";

import { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios if not already imported
import api from "../../../services/AuthService";

interface Props {
  maxBet: number;
  handleSpinClick: (
    bets: { [key: string]: number },
    totalStake: number
  ) => Promise<void>;
}

const PlaceBet = ({ maxBet, handleSpinClick }: Props) => {
  const [betAmount, setBetAmount] = useState<number>(0);
  const [textValues, setTextValues] = useState<{ [key: number]: number }>({});
  const [availableMaxBet, setAvailableMaxBet] = useState<number>(maxBet);
  const [bets, setBets] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Update availableMaxBet whenever maxBet changes
    setAvailableMaxBet(maxBet);
  }, [maxBet]);

  const theme = useTheme();

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

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBetAmount(parseFloat(event.target.value) || 0); // Ensure the value is a valid number or default to 0
  };

  const handleNumberClick = (num: number) => {
    if (betAmount <= availableMaxBet) {
      setTextValues((prev) => ({
        ...prev,
        [num]: (prev[num] || 0) + betAmount,
      }));
      setBets((prev) => ({
        ...prev,
        [`${num}`]: (prev[`${num}`] || 0) + betAmount,
      }));
      setAvailableMaxBet((prev) => prev - betAmount);
      console.log(bets);
    } else {
      console.error("Bet amount exceeds available balance");
    }
  };

  const handleColorClick = (color: string) => {
    if (betAmount <= availableMaxBet) {
      setBets((prev) => ({
        ...prev,
        [color]: (prev[color] || 0) + betAmount,
      }));
      setAvailableMaxBet((prev) => prev - betAmount);
    } else {
      console.error("Bet amount exceeds available balance");
    }
  };

  const handleClearAll = () => {
    setTextValues({});
    setAvailableMaxBet(maxBet);
    setBets({});
  };

  const createNewBet = async (bet_amount: number, bet_type: string) => {
    api
      .post("api/roulette/create-new-bet/", {
        bet_amount,
        bet_type,
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("Bet created successfully");
          console.log(response.data);
        } else {
          console.error("Error creating bet");
        }
      })
      .catch((error) => {
        console.error("Error creating bet:", error);
      });
  };

  const handleSpinClickWrapper = async () => {
    try {
      for (const [key, value] of Object.entries(bets)) {
        console.log("Betting " + betAmount + " on " + key);

        await createNewBet(value, key);
      }

      console.log("Bets submitted", bets);
      const totalStake = Object.values(bets).reduce((a, b) => a + b, 0);
      console.log("Total stake: ", totalStake);

      handleSpinClick(bets, totalStake);

      // await new Promise((resolve) => setTimeout(resolve, 6000));

      handleClearAll();
    } catch (error) {
      console.error("Error submitting bets:", error);
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          p: 3,
          borderRadius: 5,
          bgcolor: "rgba(15, 14, 15, 0.75)",
          width: "100%",
        }}
        maxWidth={800}
      >
        <FormControl variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            onChange={handleBetAmountChange}
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            sx={{
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
              borderRadius: 3,
            }}
          />
          <FormHelperText sx={{ ml: 0 }}>
            Max bet: {availableMaxBet}$
          </FormHelperText>
        </FormControl>

        <Grid container direction="row" spacing={2} sx={{ mt: 2 }}>
          <Grid size={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              <CustomBetButton
                onClickFun={() => {
                  handleColorClick("red");
                }}
                label="Red"
                colorType="red"
                additionalStyles={{ height: 56, fontSize: 22, borderRadius: 3 }}
              />
              <Box
                sx={{
                  height: 8,
                  color: "white",
                  fontSize: 10,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {bets["red"] > 0 && `$${bets["red"]}`}
              </Box>
            </Box>
          </Grid>

          <Grid size={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              <CustomBetButton
                onClickFun={() => {
                  handleColorClick("green");
                }}
                label="Green"
                colorType="green"
                additionalStyles={{ height: 56, fontSize: 22, borderRadius: 3 }}
              />
              <Box
                sx={{
                  height: 8,
                  color: "white",
                  fontSize: 10,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {bets["green"] > 0 && `$${bets["green"]}`}
              </Box>
            </Box>
          </Grid>

          <Grid size={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              <CustomBetButton
                onClickFun={() => {
                  handleColorClick("black");
                }}
                label="Black"
                colorType="black"
                additionalStyles={{ height: 56, fontSize: 22, borderRadius: 3 }}
              />
              <Box
                sx={{
                  height: 8,
                  color: "white",
                  fontSize: 10,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {bets["black"] > 0 && `$${bets["black"]}`}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={2} sx={{ mt: 1 }}>
          <Grid container direction="column" spacing={1} sx={{ flex: 1 }}>
            {Array.from({ length: 6 }, (_, i) => (
              <Grid container direction="row" spacing={1} key={i}>
                {Array.from({ length: 3 }, (_, j) => (
                  <Box
                    key={i * 3 + j + 1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <CustomBetButton
                      onClickFun={() => {
                        handleNumberClick(i * 3 + j + 1);
                      }}
                      label={(i * 3 + j + 1).toString()}
                      colorType={get_color(i * 3 + j + 1)}
                      additionalStyles={{ borderRadius: 2 }}
                    />
                    <Box
                      sx={{
                        height: 8,
                        color: "white",
                        fontSize: 10,
                        fontWeight: 500,
                        fontStyle: "italic",
                      }}
                    >
                      {textValues[i * 3 + j + 1] > 0 &&
                        `$${textValues[i * 3 + j + 1]}`}
                    </Box>
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
          <Grid container direction="column" spacing={1} sx={{ flex: 1 }}>
            {Array.from({ length: 6 }, (_, i) => (
              <Grid container direction="row" spacing={1} key={i}>
                {Array.from({ length: 3 }, (_, j) => (
                  <Box
                    key={i * 3 + j + 19}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <CustomBetButton
                      onClickFun={() => {
                        handleNumberClick(i * 3 + j + 19);
                      }}
                      label={(i * 3 + j + 19).toString()}
                      colorType={get_color(i * 3 + j + 19)}
                      additionalStyles={{ borderRadius: 2 }}
                    />
                    <Box
                      sx={{
                        height: 8,
                        color: "white",
                        fontSize: 10,
                        fontWeight: 500,
                        fontStyle: "italic",
                      }}
                    >
                      {textValues[i * 3 + j + 19] > 0 &&
                        `$${textValues[i * 3 + j + 19]}`}
                    </Box>
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid container direction={"row"} spacing={1} sx={{ mt: 1 }}>
          <CustomSubmitButton
            onClickFun={handleSpinClickWrapper}
            label={"SPIN THE WHEEL"}
            color="secondary"
            additionalStyles={{ color: "white" }}
          />
          <CustomSubmitButton
            onClickFun={handleClearAll}
            label={"CLEAR ALL"}
            color="secondary"
            variant="outlined"
            additionalStyles={{ color: "white" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceBet;
