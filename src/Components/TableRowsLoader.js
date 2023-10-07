import { Fragment } from "react";
import { Skeleton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const TableRowsLoader = ({ rowsNum, columnNum = 6 }) => {
  return (
    <Fragment>
      {[...Array(rowsNum)].map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {[...Array(columnNum)].map((ele, columnIndex) => (
            <TableCell
              key={`cell-${rowIndex}-${columnIndex}`}
              component="th"
              scope="row"
            >
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Fragment>
  );
};

export default TableRowsLoader;
