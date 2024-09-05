import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";
import { RootState } from "../state management/store";
import { useSelector } from "react-redux";

const Theme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">("dark");
  const themeState = useSelector((state: RootState) => state.Theme.mode);

  React.useEffect(() => {
    if (themeState === "system") {
      setThemeMode(prefersDarkMode ? "dark" : "light");
    } else setThemeMode(themeState);
  }, [themeState, prefersDarkMode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );
  return theme;
};

export default Theme;
