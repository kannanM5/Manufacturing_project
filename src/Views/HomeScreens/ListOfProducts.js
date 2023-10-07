import React from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { Box, TableContainer } from "@mui/material";
import { useState } from "react";

function ListOfProducts() {
  const [tableData, setTableData] = useState([]);
  return (
    <>
      <div>
        <PageHeader Btntitle={"Add Product"} heading={"List Of Products"} />
        <Box>
          <TableContainer>
            <table className={classes.devicetable}>
              <thead>
                <tr>
                  <td>S.No</td>
                  <td>Port Number</td>
                  <td>Part Name</td>
                  <td>Customer</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>23</td>
                  <td>Grinder</td>
                  <td>Preethi</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>45</td>
                  <td>Mixie</td>
                  <td>Butterfly</td>
                  <td>Action</td>
                </tr>
              </tbody>
            </table>
          </TableContainer>
        </Box>
      </div>
    </>
  );
}

export default ListOfProducts;
