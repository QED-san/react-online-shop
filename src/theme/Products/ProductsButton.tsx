import { createTheme } from "@mui/material";

const CustomButton = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#703bf7",
        dark: "#703bf7",
      },
      action: {
        active: "white",
        disabled: "gray",
      },
    },
  });
};

export default CustomButton;
