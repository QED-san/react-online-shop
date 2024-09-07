import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RootState } from "../state management/store";
import { useSelector } from "react-redux";

const Theme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">();
  const themeState = useSelector((state: RootState) => state.Theme.mode);

  React.useEffect(() => {
    if (themeState === "system") {
      setThemeMode(prefersDarkMode ? "dark" : "light");
    } else setThemeMode(themeState);
  }, [themeState, prefersDarkMode, themeMode]);
  return themeMode;
};

export default Theme;
