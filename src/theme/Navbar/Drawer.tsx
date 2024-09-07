import { createTheme, useMediaQuery } from "@mui/material";

const Drawer = (theme: string) => {
  const matches = useMediaQuery("(max-width: 1200px)");
  return createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          modal: {
            display: matches ? "block" : "none",
            scrollbarWidth: "none",
            scrollBehavior: "unset",
          },
          paperAnchorLeft: {
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            color: theme === "dark" ? "#fcfcfc" : "#2F3645",
            minWidth: "150px",
          },
        },
      },
    },
  });
};

export default Drawer;
