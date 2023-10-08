import React from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { Box, TableContainer } from "@mui/material";
import {shamir} from "../../Services/Services"
import { CustomButton } from "../../Components";

export default function emptypage() {

  const handledata = () => {
    let formdata = new FormData()
    shamir().then((res) => {
      // if(res.data.status){
      //  let response = JSON.parse(res.data.message) 
       console.log("res", JSON.parse(res.data.message));
      // }  
    }).catch((err) => {
      console.log("res111111", err);
    })
  }

  return (
    <div>
      <PageHeader Btntitle={"Add"} heading={"Line Inspection Report"} />
      <Box>
        <TableContainer>
          <table className={classes.devicetable}>
            <thead>
              <tr>
                <th colSpan={3} rowSpan={2}>
                  SETTING APPOROVAL REPORT
                  <th>M/C No.</th>
                </th>
                <tr rowSpan={2}>
                  <td>DC.No.</td>
                  <td>VTE/QA/R/02</td>
                </tr>
                <tr>
                  <td>Rev.No</td>
                  <td>00/05/10/2023</td>
                </tr>
              </tr>
              {/* <tr> */}
              <th>1</th>
              <th>Setter Name:</th>
              <th>xxxx</th>
              {/* </tr> */}
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>23</td>
                <td>Grinder</td>
              </tr>
              <tr>
                <td>2</td>
                <td>45</td>
                <td>Mixie</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Box>
      
      <CustomButton title="submit" onButtonPress={handledata}></CustomButton>
    </div>
  );
}
