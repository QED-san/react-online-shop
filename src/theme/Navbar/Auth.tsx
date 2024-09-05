import { createTheme } from "@mui/material";

const auth = () => {
  return createTheme({
    typography: {
      subtitle2: {
        fontSize: "13px",
      },
      subtitle1: {
        fontSize: "12px",
      },
    },
  });
};

export default auth;
