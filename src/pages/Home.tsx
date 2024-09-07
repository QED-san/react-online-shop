import { Box, Container } from "@mui/material";
import Theme from "../theme/Theme";

const Home = () => {
  const appTheme = Theme();

  return (
    <Box
      bgcolor={appTheme === "dark" ? "#141414" : "#fff"}
      color={appTheme === "dark" ? "#ffef" : "#000"}
      pt="20px"
    >
      <Container maxWidth="lg">
        <Box>Home</Box>
      </Container>
    </Box>
  );
};

export default Home;
