import { createTheme, Theme } from "@mui/material";

const Drawer = (theme: Theme) => {
  return createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          modal: {
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
            scrollbarWidth: "none",
            scrollBehavior: "unset",
          },
          paperAnchorLeft: {
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            color: theme.palette.mode === "dark" ? "#fcfcfc" : "#2F3645",
            minWidth: "150px",
          },
        },
      },
    },
  });
};

export default Drawer;
