import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../theme/Theme";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <ThemeProvider theme={Theme}>
      <NavBar />
      <div id="rest">
        <Outlet />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
