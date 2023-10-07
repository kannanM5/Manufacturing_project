import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CustomButton } from "../../Components";
import classes from "./AuthScreens.module.css";

function Orgmustcopypage() {
  const navigate = useNavigate();
  const location = useLocation();

  const Orgcode = location?.state?.org_code;
  const [isCopied, setIsCopied] = useState(false);

  // copyToClipboard
  const copyToClipboard = () => {
    const el = document.createElement("input");
    el.value = Orgcode;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (isCopied === false) {
      toast.success(`You have copied "${Orgcode}"`);
    }
    setIsCopied(true);
    const timeout = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(timeout);
    }, 3000);
  };

  return (
    <div className={classes.otpverifycontainer1}>
      <div className={classes.otpverifycontainer2}>
        <div className={classes.title}> Your Organization Code</div>
        <div className={classes.orgcodedesc}>
          {Orgcode}{" "}
          <span onClick={copyToClipboard}>
            {isCopied ? (
              <span className={classes.circleicon}>
                <CheckCircleIcon />
              </span>
            ) : (
              <Tooltip title="copy" placement="top">
                <ContentCopyIcon />
              </Tooltip>
            )}
          </span>
        </div>
        <div className={classes.otpbtn}>
          <CustomButton
            onButtonPress={() => navigate("/")}
            title="Back to Login"
          />
        </div>
      </div>
    </div>
  );
}

export default Orgmustcopypage;
