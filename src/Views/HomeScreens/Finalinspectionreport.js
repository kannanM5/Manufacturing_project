import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import { Box, TableContainer } from "@mui/material";
import classes from "./Management.module.css";
import { getCookie, setCookie } from "../../Store/Storage/Cookie";

function FinalInspectionReport() {
  const getCookieData = getCookie("Testing");
  const [datas, setDatas] = useState(
    getCookieData
      ? getCookieData
      : [
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
          {
            id: 1,
            first: "11",
            // second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
            eleven: "21",
            twele: "22",
            thirteen: "23",
            fourteen: "24",
            fifteen: "25",
            sixteen: "26",
            seventeen: "27",
          },
        ]
  );
  const tableHeadData = [
    {
      id: 1,
      left: "Supplier Name:",
      right: "Process:",
    },
    {
      id: 2,
      left: "Part No:",
      right: "Inv No:",
    },
    {
      id: "3",
      left: "Drg. Issue No:",
      right: "Inv Date:",
    },
    {
      id: 4,
      left: "Part Name",
      right: "Quantity:",
    },
  ];
  const finalHeadData = [
    {
      id: 1,
      left: "Supplier Name:",
      right: "Customer:",
    },
    {
      id: 2,
      left: "Address:",
      right: "Inv No:",
    },
    {
      id: "3",
      left: "Part No:",
      right: "Inv Date:",
    },
    {
      id: "4",
      left: "Drg. Issue No:",
      right: "Inv Date:",
    },
    {
      id: 5,
      left: "Part Name",
      right: "Quantity:",
    },
  ];
  const handleclick = () => {
    setCookie("Testing", datas);
  };
  return (
    <>
      <div>
        <PageHeader
          Btntitle={"Save"}
          BtntitleOne={"Finish"}
          modal={handleclick}
          heading={"Final inscepection Report"}
        />
        <div className={`table-responsive ${classes.Dashboard}`}>
          <table className={classes.devicetable}>
            <thead>
              <tr>
                <td colSpan={16} rowSpan={2}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "20px",
                      }}
                    >
                      Logo
                    </div>
                    <div className={classes.heading}>
                      FINAL INSPECTION REPORT
                    </div>
                    <div></div>
                  </div>
                </td>
                <td style={{ fontSize: "var(--textXs)" }}>DC.No</td>
                <td style={{ fontSize: "var(--textXs)" }}>VTE/QA/R/04</td>
              </tr>
              <td style={{ fontSize: "var(--textXs)" }}>REV.No</td>
              <td style={{ fontSize: "var(--textXs)" }}>00/05/10/2023</td>
              <tr className={classes.fourHeadings}>
                <th colSpan={2}>Supplier Name:</th>
                <th colSpan={10}>V.T. ENTERPRISE</th>
                <th rowSpan={2} colSpan={6}>
                  Customer
                </th>
              </tr>
              <tr className={classes.fourHeadings}>
                <th colSpan={2}>Address:</th>
                <th colSpan={10}>CHENNAI</th>
              </tr>
              <tr className={classes.fourHeadings}>
                <th colSpan={2}>Part No:</th>
                <th colSpan={10}></th>
                <th colSpan={2}>Inv No:</th>
                <th colSpan={4}></th>
              </tr>
              <tr className={classes.fourHeadings}>
                <th colSpan={2}>Drg Issue No:</th>
                <th colSpan={10}></th>
                <th colSpan={2}>Inv Date:</th>
                <th colSpan={4}></th>
              </tr>
              <tr className={classes.fourHeadings}>
                <th colSpan={2}>Part Name:</th>
                <th colSpan={10}></th>
                <th colSpan={2}>Quantity:</th>
                <th colSpan={4}></th>
              </tr>
              <tr className={classes.secondHead}>
                <th colSpan={1} rowSpan={2} className={classes.serialNo}>
                  S.No
                </th>
                <th colSpan={1} rowSpan={2}>
                  Characteristics
                </th>
                <th colSpan={1} rowSpan={2}>
                  Specifications
                </th>
                <th colSpan={1} rowSpan={2}>
                  Units
                </th>
                <th colSpan={1} rowSpan={2}>
                  Method Of
                  <br /> Check
                </th>
                <th
                  colSpan={10}
                  rowSpan={1}
                  className={classes.secondFourtColumn}
                >
                  Observations
                </th>
                <th colSpan={1} rowSpan={2}>
                  Status
                </th>
                <th colSpan={2} rowSpan={2}>
                  Remarks
                </th>
              </tr>
              <th className={classes.observe}>1</th>
              <th className={classes.observe}>2</th>
              <th className={classes.observe}>3</th>
              <th className={classes.observe}>4</th>
              <th className={classes.observe}>5</th>
              <th className={classes.observe}>6</th>
              <th className={classes.observe}>7</th>
              <th className={classes.observe}>8</th>
              <th className={classes.observe}>9</th>
              <th className={classes.observe}>10</th>
            </thead>
            <tbody>
              {datas.map((ele, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={ele?.first}
                      name="first"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].first = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  {/* <td>
                    <input
                      type="text"
                      value={ele?.second}
                      name="two"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].second = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td> */}
                  <td>
                    <input
                      type="text"
                      value={ele?.three}
                      name="three"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].three = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.four}
                      name="four"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].four = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={ele?.five}
                      name="five"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].five = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.six}
                      name="six"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].six = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.seven}
                      name="seven"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].seven = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.eight}
                      name="eight"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].eight = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.nine}
                      name="nine"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].nine = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.ten}
                      name="ten"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].ten = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.eleven}
                      name="eleven"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].eleven = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.twele}
                      name="twele"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].twele = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.thirteen}
                      name="thirteen"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].thirteen = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.fourteen}
                      name="fourteen"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].fourteen = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.fifteen}
                      name="fifteen"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].fifteen = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ele?.sixteen}
                      name="sixteen"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].sixteen = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                  <td colSpan={2}>
                    <input
                      type="text"
                      value={ele?.seventeen}
                      name="seventeen"
                      onChange={(event) => {
                        let refData = [...datas];
                        refData[index].seventeen = event.target.value;
                        setDatas([...refData]);
                      }}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ fontFamily: "var(--fontMedium)" }} colSpan={2}>
                  Checked BY
                </td>
                <td colSpan={8}></td>
                <td style={{ fontFamily: "var(--fontMedium)" }} colSpan={5}>
                  Approved By
                </td>
                <td colSpan={3}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FinalInspectionReport;
