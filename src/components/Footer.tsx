import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  CssBaseline,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import githubNameTheme from "../theme/Footer/GithubName";
import Theme from "../theme/Theme";

const Footer = () => {
  const appTheme = Theme();

  return (
    <Box
      pt="50px"
      sx={{
        color: appTheme === "dark" ? "#fff" : "#000",
        backgroundColor: appTheme === "dark" ? "#141414" : "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Box component="footer" borderTop={1} py="50px">
          <Box
            sx={{
              fontSize: "14px",
              mb: "20px",
              display: { xs: "block", lg: "none" },
            }}
          >
            Terms · Privacy Policy
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <Box
              sx={{
                flex: 1.5,
                fontSize: "13px",
                display: { xs: "none", lg: "block" },
              }}
            >
              Terms · Privacy Policy
            </Box>
            <Box sx={{ flex: 1, mb: "20px" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#8254f8",
                    fontWeight: "bold",
                  }}
                >
                  Products
                </Typography>
              </Box>
              <Box sx={{ fontSize: "12px", pt: "8px" }}>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Web Studio</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">DynamicBox Flex</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Programming Forms</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Integrations</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Command-line</Link>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, mb: "20px" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#8254f8",
                    fontWeight: "bold",
                  }}
                >
                  Resources
                </Typography>
              </Box>
              <Box sx={{ fontSize: "12px", pt: "8px" }}>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Documentation</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Tutorials & Guides</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Blog</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Support Center</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Partners</Link>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, mb: "20px" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#8254f8",
                    fontWeight: "bold",
                  }}
                >
                  Company
                </Typography>
              </Box>
              <Box sx={{ fontSize: "12px", pt: "8px" }}>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Home</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">About us</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Company values</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Pricing</Link>
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Privacy Policy</Link>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1.5, mb: "20px" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#8254f8",
                    fontWeight: "bold",
                  }}
                >
                  Subscribe
                </Typography>
              </Box>
              <Box sx={{ fontSize: "12px", pt: "8px" }}>
                <Box sx={{ mb: "4px" }}>
                  Get the latest news and articles to your inbox every month.
                </Box>
                <Box sx={{ mb: "4px" }}>
                  <Link to="/">Send</Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box borderTop={1} py="30px" sx={{ display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            <ThemeProvider theme={githubNameTheme}>
              <CssBaseline />
              <Typography variant="subtitle2" fontSize="20px">
                Made by Seraaga022
              </Typography>
            </ThemeProvider>
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "end" }}>
            <Box>
              <Grid container justifyContent="center" alignItems="center">
                <Link to="https://github.com/Seraaga022">
                  <GitHubIcon />
                </Link>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
