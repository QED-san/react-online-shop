import { createTheme } from "@mui/material";

type propsT = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};
const CustomBreakPoints = (props: propsT) => {
  return createTheme({
    breakpoints: {
      values: {
        xs: props.xs ? props.xs : 0,
        sm: props.sm ? props.sm : 600,
        md: props.md ? props.md : 960,
        lg: props.lg ? props.lg : 1280,
        xl: props.xl ? props.xl : 1920,
      },
    },
  });
};
// default yet

export default CustomBreakPoints;
