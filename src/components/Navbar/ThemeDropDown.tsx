import {
  Box,
  Button,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import menuButtonTheme from "../../theme/Navbar/MenuButton";
import { changeThemeTo } from "../../state management/Theme/ThemeSlice";
import { ThemeReducerCunstructor } from "../../state management/Theme/ThemeReducerCunstructor";
import { useDispatch } from "react-redux";
import { Brightness2, LightMode, SettingsSuggest } from "@mui/icons-material";

const ThemeDropDown = ({
  mode,
  display,
  top = "60px",
}: {
  mode: string;
  display: string;
  top?: string;
}) => {
  const dispatch = useDispatch();

  return (
    <Box
      position="absolute"
      display={display}
      border={1}
      borderRadius="15px"
      borderColor={mode === "dark" ? "#262626" : "#999999"}
      bgcolor={mode === "dark" ? "#1a1a1a" : "#fff"}
      top={top}
      p="10px"
      zIndex="999999999"
    >
      <Stack>
        <ThemeProvider theme={menuButtonTheme}>
          <CssBaseline />
          <Button
            sx={{
              textTransform: "none",
              "&.MuiButtonBase-root": {
                minWidth: "10px",
                width: "80px",
                paddingInline: "0",
              },
            }}
            onClick={() =>
              dispatch(changeThemeTo(ThemeReducerCunstructor("light")))
            }
          >
            <Typography
              width="100%"
              color={mode === "dark" ? "#fcfcfc" : "#2F3645"}
              variant="subtitle2"
            >
              <Box display="flex" alignItems="center" justifyContent="end">
                <Box mr="auto">
                  <LightMode sx={{ fontSize: "20px", mr: "5px" }} />
                  light
                </Box>
              </Box>
            </Typography>
          </Button>
          <Button
            sx={{
              textTransform: "none",
              "&.MuiButtonBase-root": {
                minWidth: "10px",
                width: "80px",
                paddingInline: "0",
              },
            }}
            onClick={() =>
              dispatch(changeThemeTo(ThemeReducerCunstructor("dark")))
            }
          >
            <Typography
              width="100%"
              color={mode === "dark" ? "#fcfcfc" : "#2F3645"}
              variant="subtitle2"
            >
              <Box display="flex" alignItems="center" justifyContent="end">
                <Box mr="auto">
                  <Brightness2 sx={{ fontSize: "20px", mr: "5px" }} />
                  dark
                </Box>
              </Box>
            </Typography>
          </Button>
          <Button
            sx={{
              textTransform: "none",
              "&.MuiButtonBase-root": {
                minWidth: "10px",
                width: "80px",
                paddingInline: "0",
              },
            }}
            onClick={() =>
              dispatch(changeThemeTo(ThemeReducerCunstructor("system")))
            }
          >
            <Typography
              width="100%"
              color={mode === "dark" ? "#fcfcfc" : "#2F3645"}
              variant="subtitle2"
            >
              <Box display="flex" alignItems="center" justifyContent="end">
                <Box mr="auto">
                  <SettingsSuggest sx={{ fontSize: "20px", mr: "5px" }} />
                  system
                </Box>
              </Box>
            </Typography>
          </Button>
        </ThemeProvider>
      </Stack>
    </Box>
  );
};

export default ThemeDropDown;
