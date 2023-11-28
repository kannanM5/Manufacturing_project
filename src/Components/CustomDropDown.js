import { Autocomplete, TextField } from "@mui/material";
import { Button, Paper } from "@material-ui/core";

import { muiStyles } from "../Utility/Constants";
import classes from "./CustomStyle.module.css";

function CustomDropDown({
  title = "",
  items = [],
  onSelectedItem,
  addnewoption,
  fieldName,
  anotherFieldName,
  editName = "",
  disabled = false,
  custom = false,
  requiredText,
  AddnewOption = false,
  errorText,
}) {
  const styles = muiStyles();
  const getItem = () => {
    let values = items.map((ele) => ({
      id: ele?.[anotherFieldName],
      label: ele?.[fieldName],
    }));

    return custom
      ? [{ id: "200", label: "Customized" }, ...values]
      : [{ id: "", label: "-- None --" }, ...values];
  };

  return (
    <>
      <div className={classes.dropdown}>
        <p className={classes.txt}>
          {title} <span className={classes.star}>{requiredText}</span>
        </p>
        <div className={classes.dropdown_conatiner}>
          <div
            style={{ marginRight: AddnewOption ? "5%" : "0%", width: "100%" }}
          >
            <Autocomplete
              // disablePortal
              id="combo-box-demo"
              size="small"
              disabled={disabled}
              disableClearable
              filterSelectedOptions
              value={{
                label: editName !== "" ? editName.toString() : "-- None --",
              }}
              options={getItem()}
              onChange={(event, val) => {
                onSelectedItem(event, val);
              }}
              // addnewoption
              getOptionLabel={(option) => option?.label}
              PaperComponent={({ children }) => {
                return <Paper>{children}</Paper>;
              }}
              renderInput={(params) => (
                <TextField className={styles.datepickerRadius} {...params} />
              )}
            />
          </div>
          {AddnewOption ? (
            <Button
              style={{
                backgroundColor: "gray",
                color: "white",
                height: "40px",
                minWidth: "40px",
                fontSize: "18px",
              }}
              variant="contained"
              onMouseDown={() => {
                if (addnewoption) {
                  addnewoption(true);
                  onSelectedItem(null, null);
                }
              }}
            >
              +
            </Button>
          ) : null}
        </div>
        {errorText ? (
          <p className={classes.errorTxt}>{errorText.toString()}</p>
        ) : null}
      </div>
    </>
  );
}

export default CustomDropDown;
