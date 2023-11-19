import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { muiStyles } from "../Utility/Constants";
import { makeStyles } from "@material-ui/core";

export default function CustomDatePicker({
  defaultValue,
  selectedDate,
  onSelectDate,
  showDate = true,
  errorText,
  datePickerProps,
  minDate,
  disabled = false,
  title = "",
  required = "",
  disableFuture,
  disableopenPicker = false,
  borderNone = true,
}) {
  const styles = makeStyles((theme) => ({
    datePicker: {
      "&>div:nth-child(2)>div>div:nth-child(1)": {
        border: "none !important",
        marginLeft: "-20px !important",
      },
    },
  }));
  const style = styles();
  const classes = muiStyles();
  const [OpenDate, setOpenDate] = useState([]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <div
          draggable="false"
          className={`${classes.dateStyles} ${
            borderNone ? classes.datePicker : style.datePicker
          }`}
          style={{
            border: "none",
            width: "100%",
            borderRadius: "7px",
            position: "relative",
          }}
        >
          {showDate ? (
            <div
              style={{
                marginBottom: "5px",
                fontFamily: "var(--fontRegular)",
                fontSize: "var(--textSm1)",
                fontWeight: "var(--fontWm)",
              }}
            >
              {title}{" "}
              <span style={{ color: "var(--dangerColor)" }}>{required}</span>
            </div>
          ) : null}
          <DemoItem>
            <DesktopDatePicker
              id="test"
              {...datePickerProps}
              disabled={disabled}
              className={classes.datepickerRadius}
              open={OpenDate?.includes("from")}
              PopperProps={{
                style: { overflow: "visible" },
                // Add any other desired Popper props
              }}
              onOpen={() => {
                setOpenDate(["from"]);
              }}
              disableFuture={disableFuture}
              disableOpenPicker={disableopenPicker}
              onClose={() => {
                setOpenDate([]);
              }}
              orientation="portrait"
              slotProps={{
                popper: {
                  style: {
                    marginTop: "-150px",
                  },
                },
                textField: {
                  onDragStart: (event) => {
                    event.preventDefault();
                  },
                  onClick: () => {
                    setOpenDate(["from"]);
                  },
                  onKeyDown: (event) => {
                    event.preventDefault();
                  },
                },
              }}
              minDate={minDate}
              value={dayjs(selectedDate, "YYYY-MM-DD")}
              defaultValue={defaultValue}
              onChange={(e, val) => {
                const selectedDate = new Date();
                onSelectDate(selectedDate, val);
              }}
              format="YYYY-MM-DD"
              autoFocus
            />

            {errorText ? (
              <p
                style={{
                  color: "red",
                  position: "absolute",
                  top: "35px",
                  fontSize: "12px",
                }}
              >
                {errorText}
              </p>
            ) : null}
          </DemoItem>
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
