import close from "../Assets/Icons/Svg/close.svg";
import classes from "./Modal.module.css";

function ModalsHeader({ onClose, heading = "" }) {
  return (
    <>
      <div className={classes.popup}>
        <div className={classes.popup_head}>
          <div className={classes.popup_head_left}>
            <div className={classes.line}></div>
            <div>
              <p className={classes.Heading}>{heading}</p>
            </div>
          </div>
        </div>
        <img className={classes.close} src={close} alt="" onClick={onClose} />
      </div>
    </>
  );
}

export default ModalsHeader;
