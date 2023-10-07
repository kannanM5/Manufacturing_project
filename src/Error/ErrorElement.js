import NetworkErrorGif from "../Assets/Images/network_error.gif";
import classes from "./Error.module.css";

export default function ErrorElement() {
  return (
    <div className={classes.errorTxt}>
      <img
        src={NetworkErrorGif}
        alt="network error"
        className={classes.networkErrorImg}
      />
      Network Error !!!
    </div>
  );
}
