// import { Pagination } from "@mui/material";
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   paginate: {
//     padding: "10px 0px",
//     "& ul": {
//       justifyContent: "end",
//     },
//   },
// }));
// export default function CustomPagination({ page, pageCount, handleFunction }) {
//   const muiStyle = useStyles();

//   return (
//     <Pagination
//       className={muiStyle.paginate}
//       count={pageCount}
//       page={page}
//       onChange={(e, selectedPage) => {
//         handleFunction(selectedPage);
//       }}
//       color="primary"
//       boundaryCount={1}
//       siblingCount={1}
//     />
//   );
// }
import { Pagination } from "antd";
import React from "react";

function CustomPagination({
  totalCount,
  onShowSizeChange,
  defaultCurrent,
  showSizeChanger,
  onChange,
}) {
  return (
    <div>
      <Pagination
        defaultCurrent={defaultCurrent}
        total={totalCount}
        showSizeChanger={showSizeChanger}
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
      />
    </div>
  );
}

export default CustomPagination;
