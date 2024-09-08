import { forwardRef } from "react";
import { styled, TextField, TextFieldProps } from "@mui/material";
import Theme from "../../../theme/Theme";

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const appTheme = Theme();
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
        color: appTheme === "dark" ? "gray" : "gray",
      },
    });

    return <StyledTextField {...props} inputRef={ref} />;
  }
);

export default CustomInput;
