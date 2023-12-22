import React from "react";
import { DatePicker } from "antd";
import classes from "./CustomStyle.module.css";
import dayjs from "dayjs";

export default function Commondate({
  value,
  placeholder,
  onChange,
  disabled = false,
  styles,
  title,
  requiredText,
  borderNone = true,
}) {
  console.log(value, "VALUEE");
  return (
    <div className={classes.datePicker}>
      <p className={classes.title}>
        {title} <span className={classes.star}>{requiredText}</span>
      </p>
      <DatePicker
        inputReadOnly
        popupStyle={{ zIndex: 11000 }}
        placeholder={placeholder}
        value={value ? dayjs(value) : null}
        onChange={onChange}
        allowClear={false}
        disabled={disabled}
        format={"YYYY-MM-DD"}
        style={{
          ...styles,
          width: "100%",
          height: "42px",
          border: borderNone ? "var(--inputBorder)" : "none",
          background: disabled ? "transparent" : "#fff",
        }}
      />
    </div>
  );
}
