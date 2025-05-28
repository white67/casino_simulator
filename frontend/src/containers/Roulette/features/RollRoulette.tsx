import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const RollRoulette: React.FC<{ isRolling: boolean }> = ({ isRolling }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "150px",
      }}
    >
      {isRolling ? (
        <>
          <CircularProgress
            sx={{
              color: "white",
            }}
          />

          <Typography
            variant="h6"
            sx={{ mt: 2, fontWeight: 600, textAlign: "center" }}
          >
            Rolling...
          </Typography>
        </>
      ) : (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Place Bets to Spin
        </Typography>
      )}
    </Box>
  );
};

export default RollRoulette;
