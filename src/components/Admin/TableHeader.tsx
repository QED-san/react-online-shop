import { Typography } from "@mui/material";
import React from "react";
import Theme from "../../theme/Theme";

const TableHeader = (props: React.PropsWithChildren) => {
  const appTheme = Theme();
  return (
    <Typography
      sx={{
        ":first-letter": {
          textTransform: "uppercase",
        },
        color: appTheme === "dark" ? "#fefe" : "#141414",
      }}
    >
      {props.children}
    </Typography>
  );
};

export default TableHeader;
