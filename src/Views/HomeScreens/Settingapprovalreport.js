import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { getCookie, setCookie } from "../../Store/Storage/Cookie";

function SettingInspectionReport() {
  const getCookieData = getCookie("Testing");
  const [datas, setDatas] = useState(
    getCookieData
      ? getCookieData
      : [
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
          {
            id: 1,
            first: "11",
            second: "12",
            three: "13",
            four: "14",
            five: "15",
            six: "16",
            seven: "17",
            eight: "18",
            nine: "19",
            ten: "20",
          },
        ]
  );
  const tableHeadData = [
    {
      id: 1,
      left: "M/C N0.",
      right: "Setter Name:",
    },
    {
      id: 2,
      left: "Part No:",
      right: "Date:",
    },
    {
      id: "3",
      left: "Part Name:",
      right: "Shift:",
    },
    {
      id: 4,
      left: "Process:",
      right: "Inspection Name",
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
          heading={"Setting Approval Report"}
        />
        <div className={`table-responsive ${classes.Dashboard}`}>
          <table className={classes.devicetable}>
            <thead>
              <tr>
                <th colSpan={11} className={classes.CompanyName}>
                  VT ENTERPRISES
                </th>
              </tr>
              <tr>
                <td colSpan={9} rowSpan={2}>
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
                      SETTING APPROVAL REPORT
                    </div>
                    <div></div>
                  </div>
                </td>
                <td style={{ fontSize: "var(--textXs)" }}>DC.No</td>
                <td style={{ fontSize: "var(--textXs)" }}>VTE/QA/R/02</td>
              </tr>
              <td style={{ fontSize: "var(--textXs)" }}>REV.No</td>
              <td style={{ fontSize: "var(--textXs)" }}>00/05/10/2023</td>
              {tableHeadData.map((head, index) => (
                <tr key={index} className={classes.fourHeadings}>
                  <th colSpan={2}>{head?.left}</th>
                  <th colSpan={5}></th>
                  <th colSpan={2}>{head?.right}</th>
                  <th colSpan={2}></th>
                </tr>
              ))}
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
                  colSpan={5}
                  rowSpan={1}
                  className={classes.secondFourtColumn}
                >
                  Observations
                </th>
                <th colSpan={1} rowSpan={2}>
                  Remarks
                </th>
              </tr>
              <th className={classes.observe}>1</th>
              <th className={classes.observe}>2</th>
              <th className={classes.observe}>3</th>
              <th className={classes.observe}>4</th>
              <th className={classes.observe}>5</th>
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
                  <td>
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
                  </td>
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
                  <td colSpan={1}>
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
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Status</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th colSpan={11} className={classes.final}>
                  <div className={classes.finalStatus}>
                    <p style={{ fontFamily: "var(--fontRegular)" }}>
                      Final Status
                    </p>
                    <div>
                      <input type="checkbox"></input>
                      <label style={{ fontFamily: "var(--fontRegular)" }}>
                        Accepted
                      </label>
                    </div>
                    <div>
                      <input type="checkbox"></input>
                      <label style={{ fontFamily: "var(--fontRegular)" }}>
                        Rejected
                      </label>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <td colSpan={2} style={{ fontFamily: "var(--fontMedium)" }}>
                  Checked BY
                </td>
                <td colSpan={4}></td>
                <td colSpan={4} style={{ fontFamily: "var(--fontMedium)" }}>
                  Appproved By
                </td>
                <td colSpan={1}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SettingInspectionReport;
