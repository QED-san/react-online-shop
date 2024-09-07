import { Box, Container } from "@mui/material";
import Theme from "../../../theme/Theme";

const DeleteCategory = () => {
  const appTheme = Theme();
  return (
    <Box
      bgcolor={appTheme === "dark" ? "#141414" : "#fff"}
      color={appTheme === "dark" ? "#fff" : "#000"}
      pt="20px"
    >
      <Container
        maxWidth="lg"
        sx={{
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1400px",
          },
        }}
      >
        <Box>Delete category</Box>;
      </Container>
    </Box>
  );
};

export default DeleteCategory;
