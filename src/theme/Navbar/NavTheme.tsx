import { createTheme } from "@mui/material";

const NavTheme = () => {
  return createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            boxShadow: "none",
          },
        },
      },
    },
  });
};

export default NavTheme;
