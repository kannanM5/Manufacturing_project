import React, { useState } from "react";
import PageHeader from "../ManagementLayoutHeader/PageHeader";
import classes from "./Management.module.css";
import { shamir } from "../../Services/Services";
import { getCookie, setCookie } from "../../Store/Storage/Cookie";

export default function Emptypage() {
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

  // const handleClick = () => {
  // shamir(
  //   .then((data) => {
  //     console.log(data, "response data then");
  //     if (data && data.status === 1) {
  //       console.log(data.message, "success");
  //     } else {
  //       console.log("Invalid response format or status is not 1");
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err, "error catch");
  //     // You can add more specific error handling here if needed.
  //   });
  // };

  const handleCLick = () => {
    shamir()
      .then((res) => {
        console.log(res, "response data then");
        const response = JSON.parse(res.data);
        console.log(response, "response");
        if (response.data.status === 1) {
          console.log("sucess", response.data.message);
        } else if (res.data.status === 0) {
          console.log(res.data.message, "fail");
        }
      })
      .catch((err) => console.log(err, "error catch"));
  };

  const handleclick = () => {
    setCookie("Testing", datas);
  };

  return (
    <div>
      <PageHeader
        Btntitle={"Save"}
        BtntitleOne={"Finish"}
        modal={handleclick}
        heading={"Incoming Inspection Report"}
      />
      <div className={classes.reportInsepection}>
        <div className={`table-responsive ${classes.Dashboard}`}>
          <table className={classes.devicetable}>
            <thead>
              <tr>
                <th colSpan={18} className={classes.CompanyName}>
                  VT ENTERPRISES
                </th>
              </tr>
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
                      INCOMING INSPECTION REPORT
                    </div>
                    <div></div>
                  </div>
                </td>
                <td style={{ fontSize: "var(--textXs)" }}>DC.No</td>
                <td style={{ fontSize: "var(--textXs)" }}>VTE/QA/R/01</td>
              </tr>
              <td style={{ fontSize: "var(--textXs)" }}>REV.No</td>
              <td style={{ fontSize: "var(--textXs)" }}>00/05/10/2023</td>
              {tableHeadData.map((head, index) => (
                <tr key={index} className={classes.fourHeadings}>
                  <th colSpan={2}>{head?.left}</th>
                  <th colSpan={9}></th>
                  <th colSpan={5} className={classes.secondRowThirdColumn}>
                    {head?.right}
                  </th>
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
                <th colSpan={18} className={classes.final}>
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
                <td colSpan={8}></td>
                <td colSpan={5} style={{ fontFamily: "var(--fontMedium)" }}>
                  Approved By
                </td>
                <td colSpan={3}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
