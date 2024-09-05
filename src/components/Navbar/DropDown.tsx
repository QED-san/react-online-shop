import React from "react";
import { Box } from "@mui/material";

type cartDropDownT = {
  display: string;
  children: React.ReactNode;
  mode: string;
  p?: string;
  top?: string;
  left?: string;
};

const DropDown: React.FC<cartDropDownT> = ({
  display,
  children,
  mode,
  p = "10px",
  top = "32px",
  left = "0",
}) => {
  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      p={p}
      borderRadius="15px"
      display={display}
      border={1}
      borderColor={mode === "dark" ? "#262626" : "#999999"}
      bgcolor={mode === "dark" ? "#1a1a1a" : "#fff"}
      zIndex="1"
    >
      {children}
    </Box>
  );
};

export default DropDown;
