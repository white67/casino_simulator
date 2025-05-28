import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Balance from "../../components/Balance";
import PlaceBet from "./features/PlaceBet";
import RouletteSpin from "./features/RouletteSpin";
import api from "../../services/AuthService";
import { ACCESS_TOKEN } from "../../services/constants.tsx";
import backgroundImage from "./../../assets/images/casino-bg.png";

import SimpleNav from "../Navbar/Navbar";
import CustomOutcomeEl from "./features/CustomOutcomeEl";
import WinningAlert from "../../components/WinningAlert";

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
  } else if (number_color["black"].includes(num)) {
    return "black";
  }
}

const fetchBalance = async () => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("api/balance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.balance;
  } catch (error) {
    console.error("Error fetching balance: ", error);
    throw error;
  }
};

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

    // console.log("Balance updated successfully");
  } catch (error) {
    console.error("Error updating balance: ", error);
    throw error;
  }
};

const get_random_generated_number = async () => {
  try {
    const response = await api.get("api/roulette/generate-number/");
    // console.log("random_number: ", numLayout[response.data.random_number]);
    return response.data.random_number;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

function Roulette() {
  const [balanceValue, setBalance] = useState<number>(0);

  const [showWinningAlert, setShowWinningAlert] = useState(false);
  const [winningAmount, setWinningAmount] = useState(0);
  const [outcomeNumbers, setOutcomeNumbers] = useState<number[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const CURRENCY = "$";

  // spinning
  const numLayout = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];

  const refreshBalance = (depositedAmount: number) => {
    setBalance((prevBalance) => prevBalance + depositedAmount);
  };

  useEffect(() => {
    fetchBalance().then((balance) => {
      setBalance(balance);
    });
  });

  const get_random_generated_number = async () => {
    try {
      const response = await api.get("api/roulette/generate-number/");
      // console.log("random_number: ", numLayout[response.data.random_number]);
      return response.data.random_number;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

  const handleSpinClick = async (
    bets: { [key: string]: number },
    totalStake: number
  ) => {
    let winning_number = -1;
    if (!mustSpin && totalStake > 0) {
      // console.log("Spinning the wheel");

      updateBalance(-totalStake);
      setBalance((prevBalance) => prevBalance - totalStake);
      try {
        const prize_number = await get_random_generated_number();
        winning_number = numLayout[prize_number];
        setPrizeNumber(prize_number);
      } catch (error) {
        console.error("Error generating number:", error);
      }

      // const randomNumber = Math.floor(Math.random() * 37);
      // console.log("randomNumberIndex", randomNumber);
      // console.log("randomNumber", numLayout[randomNumber]);
      // setPrizeNumber(randomNumber);
      setMustSpin(true);

      // wait for 6 seconds (time for the wheel to spin)
      await new Promise((resolve) => setTimeout(resolve, 6000));

      setOutcomeNumbers((prevNumbers) => {
        const updatedNumbers = [winning_number, ...prevNumbers];
        return updatedNumbers.slice(0, 10); // Keep only the first 10 elements
      });

      if (winning_number != -1) {
        const winning_color = get_color(winning_number);

        // test
        // console.log("bets.hasOwnProperty(winning_number)");
        // console.log(winning_number);
        // console.log(bets.hasOwnProperty(winning_number));
        // console.log("bets.hasOwnProperty(winning_color)");
        // console.log(winning_color);
        // console.log(bets.hasOwnProperty(winning_color));
        let combined_win = 0;
        if (bets.hasOwnProperty(winning_number)) {
          const total_bet_win = bets[winning_number] * 35;
          combined_win += total_bet_win;
          // setBalance((prevBalance) => prevBalance + total_bet_win);
        }
        if (bets.hasOwnProperty(winning_color)) {
          let total_bet_win = bets[winning_color] * 2;
          if (winning_color === "green") {
            total_bet_win = total_bet_win + bets[winning_color] * 33;
          }
          combined_win += total_bet_win;
          // setBalance((prevBalance) => prevBalance + total_bet_win);
        }

        updateBalance(combined_win);

        if (combined_win > 0) {
          setBalance((prevBalance) => prevBalance + combined_win);
          setWinningAmount(combined_win);
          setShowWinningAlert(true);
        }
      }
    }
  };

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
    <>
      <WinningAlert
        amount={winningAmount}
        open={showWinningAlert}
        onClose={() => setShowWinningAlert(false)}
      />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`, // Set the background image
          backgroundSize: "cover", // Ensure the image covers the entire area
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
          minHeight: "100vh", // Ensure it covers the viewport height
          overflow: "hidden", // Prevent scrolling
          display: "flex",
          flexDirection: "column", // Maintain column layout
        }}
      >
        <SimpleNav onBalanceUpdate={refreshBalance} />
        {/* <h1>{numLayout[prizeNumber]}</h1> */}
        <Balance balance={balanceValue} currency={CURRENCY} />
        <Grid
          container
          spacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            flexDirection: {
              xs: "column", // Adjust layout for extra small devices
              sm: "row",
            },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            xs={12}
            sm={12}
            sx={{
              pt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* {details.map((el) => (
          <h4>{el["employee"]}</h4>
        ))} */}
            <RouletteSpin
              mustSpin={mustSpin}
              prizeNumber={prizeNumber}
              setMustSpin={setMustSpin}
            />
          </Grid>
          <Grid
            xs={12}
            sm={12}
            sx={{
              pt: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlaceBet maxBet={balanceValue} handleSpinClick={handleSpinClick} />
            {/* Buttons Grid with Matched Width */}
            <Box
              mt={1}
              sx={{
                width: "100%",
                mx: "auto",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                spacing={1}
              >
                {outcomeNumbers.map((number, index) => (
                  <Grid item key={index} xs={1} sm={1}>
                    <CustomOutcomeEl
                      label={`${number}`}
                      colorType={get_color(number)}
                      isLast={index === 0} // Highlight the last element
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Roulette;
