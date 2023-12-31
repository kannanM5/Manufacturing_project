import { CustomButton } from "../../Components";
import classes from "./PageHeader.module.css";

function PageHeader({
  modal,
  heading,
  Btntitle,
  BtntitleOne,
  onPressOvertime,
  BtnTrue = false,
  secondBtn = true,
}) {
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.header_left}>
          <div className={classes.line}></div>
          <div className={classes.heading}>{heading}</div>
        </div>
        {BtnTrue ? null : (
          <div className={classes.header_right}>
            {Btntitle && (
              <CustomButton
                onButtonPress={modal}
                title={Btntitle}
                customButtonStyle={{
                  backgroundColor: "var(--btnColor)",
                  fontSize: "13px",
                  fontWeight: "500",
                  padding: "10px 15px",
                  boxShadow: "0px 1.89921px 3.79843px rgba(0, 0, 0, 0.06)",
                }}
              />
            )}
            {secondBtn && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
