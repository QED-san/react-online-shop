import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Theme from "../theme/Theme";
import { SnackbarProvider } from "notistack";

const Layout = () => {
  const appTheme = Theme();
  return (
    <ThemeProvider theme={createTheme({})}>
      <SnackbarProvider>
        <Box height="100svh" bgcolor={appTheme === "dark" ? "#141414" : "#fff"}>
          <NavBar />
          <div id="rest">
            <Outlet />
          </div>
          <Footer />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Layout;
