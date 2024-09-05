import { createTheme } from "@mui/material";

const PagesLinks = () => {
  return createTheme({
    typography: {
      subtitle1: {
        fontFamily: "'Njord Regular', sans-serif",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Njord Regular';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url('/fonts/Njord Regular.otf') format('opentype');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });
};

export default PagesLinks;
