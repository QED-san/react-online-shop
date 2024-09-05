import { forwardRef } from "react";
import { styled, TextField, useTheme, TextFieldProps } from "@mui/material";

const CustomTextInput = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const appTheme = useTheme();
    const StyledTextField = styled(TextField)({
      width: "100%",
      height: "50px",
      border: "none",
      outline: "none",
      "& .MuiInputBase-input": {
        color: "gray",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&:hover:not(.Mui-focused)": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          outline: "none",
        },
      },
      "& .Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          outline: "none",
        },
      },
      "& .MuiInputBase-input::placeholder": {
        color: appTheme.palette.mode === "light" ? "gray" : "silver",
      },
    });

    return <StyledTextField {...props} inputRef={ref} />;
  }
);

export default CustomTextInput;
