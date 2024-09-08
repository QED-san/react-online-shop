import { createTheme, useMediaQuery } from "@mui/material";

const Drawer = () => {
  const matches = useMediaQuery("(max-width: 1200px)");
  return createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          modal: {
            display: matches ? "block" : "none",
            scrollbarWidth: "none",
          },
          paperAnchorLeft: {
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            minWidth: "150px",
          },
        },
      },
    },
  });
};

export default Drawer;
