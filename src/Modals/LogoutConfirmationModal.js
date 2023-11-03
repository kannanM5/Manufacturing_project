import React from "react";

import confirm_delete from "../Assets/Icons/Svg/confirmDelete.svg";
import { CustomButton } from "../Components";
import classes from "./Modal.module.css";

function LogoutConfirmationModal({
  msg,
  onClose,
  onPositiveButtonPressed,
  onNegativeButtonPressed,
  positiveButtonText = "Logout",
  negativeButtonText = "Cancel",
}) {
  return (
    <>
      <div className={classes.confirmModal}>
        <div onClick={onClose} className={classes.deleteIcon}>
          <img src={confirm_delete} alt="Delete" />
        </div>
        <p className={classes.text}>{msg}</p>
        <div className={classes.confirm_Btns}>
          <CustomButton
            customButtonStyle={{
              padding: "10px 20px",
              backgroundColor: "var(--tableHeadBg)",
            }}
            onButtonPress={onNegativeButtonPressed}
            title={negativeButtonText}
          />
          <CustomButton
            customButtonStyle={{
              padding: "10px 20px",
            }}
            onButtonPress={onPositiveButtonPressed}
            title={positiveButtonText}
          />
        </div>
      </div>
    </>
  );
}

export default LogoutConfirmationModal;
