import { Box, Container, useTheme } from "@mui/material";

const Home = () => {
  const appTheme = useTheme();
  return (
    <Box
      bgcolor={appTheme.palette.mode === "dark" ? "#141414" : "#fff"}
      color={appTheme.palette.mode === "dark" ? "#ffef" : "#000"}
      pt="20px"
    >
      <Container maxWidth="lg">
        <Box>Home</Box>
      </Container>
    </Box>
  );
};

export default Home;
