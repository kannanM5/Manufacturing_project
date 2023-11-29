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
  isFuture = true,
  title,
  errorText,
  fromDateValue,
  requiredText,
  borderNone = true,
}) {
  const disableDates = (date) => {
    // Disable dates before the selected "from date"
    if (fromDateValue) {
      return date.isBefore(dayjs(fromDateValue).startOf("day"));
    }
    return false;
  };
  return (
    <div className={classes.datePicker}>
      <p className={classes.title}>
        {title} <span className={classes.star}>{requiredText}</span>
      </p>
      <DatePicker
        popupStyle={{ zIndex: 11000 }}
        placeholder={placeholder}
        value={value ? dayjs(value) : null}
        onChange={onChange}
        disabled={disabled}
        style={{
          ...styles,
          width: "100%",
          height: "42px",
          border: borderNone ? "var(--inputBorder)" : "none",
          background: disabled ? "rgb(216 216 216 / 44%)" : "#fff",
        }}
        // className={classes.borderinput}
        disabledDate={disableDates}
      />
      {/* {errorText ? <ErrorText msg={errorText.toString()} /> : null} */}
    </div>
  );
}
