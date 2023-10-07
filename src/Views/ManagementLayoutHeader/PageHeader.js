import { useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Close, DownloadOutlined } from "@mui/icons-material";
import { CustomButton } from "../../Components";
import classes from "./PageHeader.module.css";

function PageHeader({
  modal,
  heading,
  Btntitle,
  BtntitleOne,
  onPressOvertime,
  BtnTrue = false,
  downloadBtn = false,
  closeIcon = false,
  closeClick,
}) {
  const { pathname } = useLocation();

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.header_left}>
          <div className={classes.line}></div>
          <div className={classes.heading}>{heading}</div>
        </div>
        {closeIcon ? (
          <Close style={{ cursor: "pointer" }} onClick={closeClick} />
        ) : null}
        {BtnTrue ? null : (
          <div className={classes.header_right}>
            <CustomButton
              onButtonPress={modal}
              title={Btntitle}
              customButtonStyle={{
                backgroundColor: "#262626",
                fontSize: "13px",
                fontWeight: "500",
                padding: "10px 15px",
                boxShadow: "0px 1.89921px 3.79843px rgba(0, 0, 0, 0.06)",
              }}
            />
            {pathname === "/dashboard/management/work_shedule" ||
            pathname === "/Workorder" ||
            pathname === "/Workorder/Workorderlist" ||
            pathname === "/dashboard/management/machine/macine_details_list" ? (
              <div style={{ marginLeft: "23px" }}>
                <CustomButton
                  onButtonPress={onPressOvertime}
                  title={BtntitleOne}
                  customButtonStyle={{
                    backgroundColor: "#262626",
                    fontSize: "13px",
                    fontWeight: "500",
                    padding: "10px 15px",
                    boxShadow: "0px 1.89921px 3.79843px rgba(0, 0, 0, 0.06)",
                  }}
                />
              </div>
            ) : null}
          </div>
        )}
        {downloadBtn && (
          <Button className={classes.downloadBtn}>
            <DownloadOutlined /> Download
          </Button>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
