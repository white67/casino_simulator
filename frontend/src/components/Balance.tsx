import { Container, Typography } from "@mui/material";

interface Props {
  balance: number;
  currency: string;
}

const Balance = ({ balance, currency }: Props) => {
  if (balance < 0) {
    balance = 0;
  }

  return (
    <Container sx={{ textAlign: "center", padding: "0.5rem" }}>
      <Typography variant="h5" gutterBottom>
        Balance: {currency}
        {balance}
      </Typography>
    </Container>
  );
};

export default Balance;
