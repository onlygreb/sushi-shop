import { createTheme } from "@mui/material";

// Tema criado para fornecer a coloração base dos componentes de MaterialUI.
const theme = createTheme({
  palette: {
    primary: {
      main: '#471a2f',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#471a2f',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
  },
});

export default theme;