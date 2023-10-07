import { useState } from "react";
import invisible from "../Assets/Icons/Svg/invisibleicon.svg";
import { muiStyles } from "../Utility/Constants";
import visible from "../Assets/Icons/Svg/visibleicon.svg";
import classes from "./CustomStyle.module.css";
import CustomButton from "./CustomButton";

export default function InputBox({
  title = "",
  placeHolder = "",
  value,
  onChangeText,
  customInputProps,
  errorText = "",
  name = "",
  id,
  requiredText = "",
  disabled = false,
  titleStyle,
  isSecure = false,
  infotxt = null,
  inputBoxStyle,
  noneBorder,
  cursor,
  verify = false,
  verifyBtn,
  readOnly,
}) {
  const styles = muiStyles();
  const [secure, setsecure] = useState(false);

  const getSecureText = () => {
    return secure ? "text" : "password";
  };

  return (
    <div className={classes.container}>
      <p className={classes.title} style={titleStyle}>
        {title} <span className={classes.star}>{requiredText}</span>
      </p>
      <div
        className={
          noneBorder
            ? `${classes.inputBox} ${styles.borderNone}`
            : classes.inputBox
        }
        style={{
          opacity: disabled ? "0.5" : "",

          border: errorText ? "1px solid red" : "var(--inputBorder)",
          ...inputBoxStyle,
        }}
      >
        <input
          draggable="false"
          name={name}
          id={id}
          value={value}
          type={isSecure ? getSecureText() : "text"}
          onChange={(e) => {
            if (!disabled && !readOnly) {
              onChangeText(e.target.value);
            }
          }}
          placeholder={placeHolder}
          style={{
            width: isSecure || verify ? "87%" : "100%",
            cursor: disabled ? "not-allowed" : cursor ? cursor : "",
          }}
          disabled={disabled}
          {...customInputProps}
          readOnly={readOnly}
          autoComplete="new-password"
        />
        {isSecure ? (
          <div className={classes.passwordIcon}>
            <img
              src={secure ? visible : invisible}
              alt="visible"
              onClick={() => setsecure((prev) => !prev)}
            />
          </div>
        ) : null}
        {verify ? (
          <div style={{ width: "20%" }}>
            <CustomButton
              title="Verify"
              onButtonPress={verifyBtn}
              customButtonStyle={{
                height: verify ? "40px" : "42px",
                backgroundColor: "var(--successColor)",
              }}
            />
          </div>
        ) : null}
      </div>
      {infotxt ? (
        <p className={classes.infotext}>
          <span className="material-symbols-outlined">info</span>
          {infotxt}
        </p>
      ) : null}
      {errorText ? (
        <p className={classes.errorTxt}>{errorText.toString()}</p>
      ) : null}
    </div>
  );
}
