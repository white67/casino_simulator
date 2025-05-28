import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import DepositForm from "../../components/DepositForm";
import WithdrawForm from "../../components/WithdrawForm";

const buttons = [
  <Button key="roulette" href="/roulette">
    Roulette
  </Button>,
  <Button key="blackjack" href="/blackjack">
    Blackjack
  </Button>,
];

interface NavbarProps {
  onBalanceUpdate: (depositedAmount: number) => void;
}

const SimpleNav: React.FC<NavbarProps> = ({ onBalanceUpdate }) => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleDepositOpenPopup = () => {
    setIsDepositOpen(true);
  };

  const handleDepositClosePopup = () => {
    setIsDepositOpen(false);
  };

  const handleWithdrawOpenPopup = () => {
    setIsWithdrawOpen(true);
  };

  const handleWithdrawClosePopup = () => {
    setIsWithdrawOpen(false);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        bgcolor: "primary.dark", 
      }}
      pt={1}
      pb={1}
    >
      {/* Center ButtonGroup */}
      <Box
        sx={{
          flex: 1, 
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
          width: "100%", 
          position: "absolute",
        }}
      >
        <ButtonGroup color="secondary" aria-label="Medium-sized button group">
          {buttons}
        </ButtonGroup>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2, 
        }}
      >
        {useMediaQuery("(min-width: 700px)") && username && (
          <Box>{username}</Box>
        )}{" "}
        {/* Display username only if width > 500px */}
        <Button
          id="settings_menu"
          onClick={handleClick}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <SettingsIcon />
        </Button>
        <Menu
          id="settings_menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleDepositOpenPopup}>Deposit</MenuItem>
          <DepositForm
            open={isDepositOpen}
            onClose={handleDepositClosePopup}
            onDeposit={onBalanceUpdate}
          />
          <MenuItem onClick={handleWithdrawOpenPopup}>Withdraw</MenuItem>
          <WithdrawForm
            open={isWithdrawOpen}
            onClose={handleWithdrawClosePopup}
            onWithdraw={onBalanceUpdate}
          />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default SimpleNav;
