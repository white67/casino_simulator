import Box from "@mui/material/Box";

interface Props {
  nr: number;
}

export default function NumEl({ nr }: Props) {
  let bgcolor = "";
  if (nr === 0) {
    bgcolor = "green";
  } else if (nr % 2 === 0) {
    bgcolor = "red";
  } else {
    bgcolor = "black";
  }

  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        borderRadius: 1,
        bgcolor: bgcolor,
        p: 1,
      }}
    >
      {nr}
    </Box>
  );
}
