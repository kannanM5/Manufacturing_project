import React from "react";
import classes from "./CustomStyle.module.css";
import ReactPaginate from "react-paginate";

function CustomPagination({ forcePage, pageCount, onPageChange, currentpage }) {
  return (
    <div className={classes.pagenation}>
      <ReactPaginate
        breakClassName={classes.active}
        breakLabel="..."
        nextLabel=">"
        forcePage={forcePage}
        containerClassName={`${classes.pagination_container} p-0 mb-1`}
        pageClassName={classes.active}
        // pageLinkClassName={
        //   " text-secondary  pt-1 pb-1 ps-2 pe-2 ms-1 me-1 border-0 shadow-none"
        // }
        previousClassName={classes.active}
        previousLinkClassName={
          currentpage === 1 || !currentpage
            ? classes.labellinkdisable
            : classes.labellink
        }
        nextClassName={classes.active}
        nextLinkClassName={
          currentpage === pageCount || !pageCount
            ? classes.labellinkdisable
            : classes.labellink
        }
        activeClassName={classes.currentpage}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        onPageChange={(value) => onPageChange(value?.selected)}
        pageCount={pageCount ? Math.ceil(pageCount) : 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default CustomPagination;
