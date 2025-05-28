import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

declare module "@mui/material/styles" {
  interface Theme {
    rul_num_color: {
      red: string;
      black: string;
      green: string;
      red_light: string;
      black_light: string;
      green_light: string;
    };
    customColors: {
      dark85: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    rul_num_color?: {
      red?: string;
      red_light?: string;
      black?: string;
      black_light?: string;
      green?: string;
      green_light?: string;
    };
    customColors?: {
      dark85?: string;
    };
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#6fbc9d",
      main: "#ffffff",
      dark: "#0f0e0f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ddb529",
    },
  },
  rul_num_color: {
    red: "#dc0004",
    black: "#131011",
    green: "#249e00",
    red_light: "#ff888a",
    black_light: "#414141",
    green_light: "#7ddf60",
  },
  typography: {
    fontFamily: "Libre Franklin, sans-serif",
  },
  customColors: {
    dark85: "rgba(15, 14, 15, 0.85)",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
