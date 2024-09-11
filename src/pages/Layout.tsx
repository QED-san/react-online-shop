import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { createTheme, ThemeProvider } from "@mui/material";

const Layout = () => {
  return (
    <ThemeProvider theme={createTheme({})}>
      <NavBar />
      <div id="rest">
        <Outlet />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
