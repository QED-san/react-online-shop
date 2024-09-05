import { createTheme } from "@mui/material";

const MenuButton = () => {
  return createTheme({
    typography: {
      h5: {
        fontFamily: "Origram, sans-serif",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Origram';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url('/fonts/Origram.otf') format('opentype');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
    palette: {
      info: {
        main: "#111",
        light: "#111",
        dark: "#111",
      },
    },
  });
};

export default MenuButton;
