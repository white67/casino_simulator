// import { Button as Button2 } -- explanation: so that at the end we can name this whole component as a Button, not Button2 or else because it'd be reserved
import { Button as Button2 } from "@mui/material";

interface Props {
  text: string;
  bgcolor?: string;
  sx?: any;
  onClick?: () => void;
}

const Button = ({ text, bgcolor, sx, onClick }: Props) => {
  return (
    <Button2
      variant="contained"
      onClick={onClick}
      sx={{ ...sx, bgcolor: bgcolor }}
    >
      {text}
    </Button2>
  );
};

export default Button;
