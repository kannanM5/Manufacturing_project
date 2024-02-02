import React from "react";
import confirm_delete from "../Assets/Icons/SvgIcons/confirmDelete.svg";
import { CustomButton } from "../Components";
import classes from "./Modal.module.css";
import successIcon from "../Assets/Images/Success.jpg";

function LogoutConfirmationModal({
  msg,
  onPositiveButtonPressed,
  onNegativeButtonPressed,
  positiveButtonText = "Logout",
  negativeButtonText = "Cancel",
  cancelBtn = true,
  secondaryMsg,
  BtnTrue = true,
}) {
  return (
    <>
      <div className={classes.confirmModal}>
        <div className={classes.deleteIcon}>
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
        {secondaryMsg && (
          <p
            className={classes.text}
            style={{
              fontSize: "16px",
            }}
          >
            {secondaryMsg}
          </p>
        )}
        {BtnTrue && (
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default LogoutConfirmationModal;
