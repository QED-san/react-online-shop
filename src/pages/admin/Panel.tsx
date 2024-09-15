import { Box, Container } from "@mui/material";
import Theme from "../../theme/Theme";
import { Link, Outlet } from "react-router-dom";

const Panel = () => {
  const appTheme = Theme();

  return (
    <Box
      bgcolor={appTheme === "dark" ? "#141414" : "#fff"}
      color={appTheme === "dark" ? "#ffef" : "#000"}
      pt="20px"
    >
      <Container maxWidth="xl">
        <Box>
          {/* navigations */}
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="30px"
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Box border="1px solid gray" p="10px" borderRadius="10px">
                <Link to="">Products</Link>
              </Box>
              <Box border="1px solid gray" p="10px" borderRadius="10px">
                <Link to="category_management">Categories</Link>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Panel;
