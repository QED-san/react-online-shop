import { TableCell } from "@mui/material";
import Theme from "../../theme/Theme";
import React from "react";
import { TableCellProps } from "@mui/material";

const TableBodyCell = (props: React.PropsWithChildren & TableCellProps) => {
  const appTheme = Theme();
  return (
    <TableCell
      sx={{
        color: appTheme === "dark" ? "#fefe" : "#141414",
      }}
    >
      {props.children}
    </TableCell>
  );
};

export default TableBodyCell;
