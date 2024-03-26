import { createTheme } from "@mui/material/styles";
import { purple, red } from "@mui/material/colors";
// import purple from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#3E51B0",
    },
    secondary: {
      main: "#e8e8e854",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#E8E8E8",
    },
  },
});

export default theme;
