import React from "react";
import confirm_delete from "../Assets/Icons/Svg/confirmDelete.svg";
import { CustomButton } from "../Components";
import classes from "./Modal.module.css";
import successIcon from "../Assets/Images/Jpg/Success.jpg";
function LogoutConfirmationModal({
  msg,
  onClose,
  onPositiveButtonPressed,
  onNegativeButtonPressed,
  positiveButtonText = "Logout",
  negativeButtonText = "Cancel",
  cancelBtn = true,
}) {
  return (
    <>
      <div className={classes.confirmModal}>
        <div onClick={onClose} className={classes.deleteIcon}>
          <img src={cancelBtn ? confirm_delete : successIcon} alt="Delete" />
        </div>

        <p
          className={classes.text}
          style={{
            fontSize: !cancelBtn ? "30px" : "var(--textSm1)",
          }}
        >
          {msg}
        </p>
        <div className={classes.confirm_Btns}>
          {cancelBtn && (
            <CustomButton
              customButtonStyle={{
                padding: "10px 20px",
                backgroundColor: "var(--tableHeadBg)",
              }}
              onButtonPress={onNegativeButtonPressed}
              title={negativeButtonText}
            />
          )}
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
