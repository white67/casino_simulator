import SimpleNav from "../Navbar/Navbar";
import BlackjackGame from "./features/BlackjackGame.tsx";
import Button from "../../components/Button.tsx";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Balance from "../../components/Balance.tsx";
import PlaceBet from "./features/PlaceBet.tsx";
import BetInfo from "./features/BetInfo.tsx";
import { Container } from "@mui/material";
import api from "../../services/AuthService.tsx";
import { ACCESS_TOKEN } from "../../services/constants.tsx";
import WinningAlert from "../../components/WinningAlert.tsx";

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

    console.log("Balance: ", response.data.balance);
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

    console.log("Balance updated successfully");
  } catch (error) {
    console.error("Error updating balance: ", error);
    throw error;
  }
};

const Blackjack = () => {
  const CURRENCY = "$";
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gameKey, setGameKey] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [winner, setWinner] = useState<string>("");
  const [bet, setBet] = useState<number>(0);
  const [showWinningAlert, setShowWinningAlert] = useState(false);

  useEffect(() => {
    fetchBalance().then((balance) => {
      setBalance(balance);
    });
  }, [isGameStarted]);

  function refreshBalance() {
    useEffect(() => {
      fetchBalance().then((balance) => {
        setBalance(balance);
      });
    });
  }

  useEffect(() => {
    if (winner === "Player") {
      setShowWinningAlert(true);
    }
  }, [winner]);

  useEffect(() => {
    if (winner === "Player") {
      updateBalance(bet);
    } else if (winner === "Dealer") {
      updateBalance(-bet);
    }
  }, [winner]);

  useEffect(() => {
    if (balance <= bet) {
      setBet(balance);
    }
  }, [balance]);

  const createGame = async () => {
    setIsGameStarted(true);
    setGameKey((prevKey) => prevKey + 1);
    setWinner("");
    handleNewgameClickWrapper(bet);
  };

  const handleNewgameClickWrapper = async (value: number) => {
    try {
      await createNewBet(value, "BlackJack");
      // await new Promise((resolve) => setTimeout(resolve, 6000));
    } catch (error) {
      console.error("Error submitting bets:", error);
    }
  };

  const addBet = (amount: number) => {
    const temp = bet + amount;
    if (temp <= balance) {
      setBet(temp);
    }
    if (temp < 0) {
      setBet(0);
    }
  };

  return (
    <>
      <SimpleNav onBalanceUpdate={refreshBalance} />
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1>Blackjack</h1>
        <Box sx={{ display: "flex", minHeight: "50vh" }}>
          {isGameStarted && (
            <BlackjackGame
              key={gameKey}
              setIsGameStarted={setIsGameStarted}
              setWinner={setWinner}
            />
          )}
          {!isGameStarted && (
            <Button
              sx={{ height: "2rem", alignSelf: "flex-end" }}
              bgcolor={"green"}
              text={"New Game"}
              onClick={createGame}
            />
          )}
        </Box>
        <BetInfo betValue={bet} currency={CURRENCY} balance={0} />
        {!isGameStarted && <PlaceBet addBet={addBet} />}
        <Balance balance={balance} currency={CURRENCY} />
      </Container>
      <WinningAlert
        amount={bet}
        open={showWinningAlert}
        onClose={() => setShowWinningAlert(false)}
      />
    </>
  );
};

export default Blackjack;
