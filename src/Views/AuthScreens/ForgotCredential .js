import { useNavigate } from "react-router-dom";

import forgoticon from "../../Assets/Icons/Svg/forgoticon.svg";
import orgicon from "../../Assets/Icons/Svg/orgcodeicon.svg";
import classes from "./AuthScreens.module.css";

function ForgotCredential() {
  const navigate = useNavigate();
  return (
    <div className={classes.otpverifycontainer1}>
      <div className={classes.otpverifycontainer2}>
        <div className={classes.title}>Forgot Credentials!</div>
        <div className={classes.desc}>Select Which one you want </div>
        <div className={classes.desc1content}>
          <div
            className={classes.forgotPassword}
            onClick={() => navigate("/forgot_password")}
          >
            <div className={classes.forgoticon}>
              <img src={forgoticon} alt="forgoticon"></img>
            </div>
            <div className={classes.forinfo}>
              <div className={classes.enternumemail}>
                Enter your mobile number or Email
              </div>
              <div className={classes.forpassandorg}>Forgot Password</div>
            </div>
          </div>
          <div
            className={classes.forgotPassword}
            onClick={() => navigate("/forgot_Org")}
          >
            <div className={classes.forgoticon}>
              <img src={orgicon} alt="orgicon"></img>
            </div>
            <div className={classes.forinfo}>
              <div className={classes.enternumemail}>
                Enter your mobile number or Email
              </div>
              <div className={classes.forpassandorg}>
                Forgot Organization Code
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotCredential;
