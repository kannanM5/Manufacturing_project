import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import { CustomButton, TextInputBox } from "../../Components";
import classes from "./Management.module.css";
import { FormControl, MenuItem, Select } from "@mui/material";
function Export() {
  const [dropdownName, setDropDownName] = useState(1);
  const dropDownItem = [
    {
      id: 1,
      name: "Incoming Inspection Report",
      path: "/Prepareinscepectionreport/incoming_inspection_report",
    },
    {
      id: 2,
      name: "Setting Approval Report",
      path: "/Prepareinscepectionreport/setting_approval_report",
    },
    {
      id: 3,
      name: "Line Inspection Report",
      path: "/Prepareinscepectionreport/line_inspection_report",
    },
    {
      id: 4,
      name: "Final Inspection Report",
      path: "/Prepareinscepectionreport/final_inspection_report",
    },
  ];
  return (
    <div>
      <PageHeader heading={"Export"} BtnTrue={true} />
      <div className={classes.Export}>
        <div className="row">
          <div className="col-lg-4">
            <p className={classes.selectHead}>Select Report Type</p>
            <FormControl>
              <Select
                value={dropdownName}
                onChange={(e) => {
                  setDropDownName(e.target.value);
                }}
              >
                {dropDownItem.map((items, index) => {
                  return (
                    <MenuItem key={index} value={items.id}>
                      {items.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-lg-4">
            <TextInputBox title="Date" />
          </div>
          {/* <div className="col-lg-4">
            <TextInputBox title="From Date" />
          </div>
          <div className="col-lg-4">
            <TextInputBox title="To Date" />
          </div> */}
          <div className="col-lg-4">
            <TextInputBox title="Part No" />
          </div>
          <div className="col-lg-4">
            <TextInputBox title="Process" />
          </div>
          <div className="col-lg-4">
            <TextInputBox title="Customer" />
          </div>

          <div className="col-lg-1 mt-4">
            <CustomButton title="Search" />
          </div>

          <div className="col-lg-1 mt-4">
            <CustomButton title="Download" />
          </div>
        </div>
        <div className={`table-responsive ${classes.Dashboard}`}>
          <table>
            <thead className={classes.listOfTable}>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Part No</th>
                <th>Process</th>
                <th>Inspction Report Type</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Export;
