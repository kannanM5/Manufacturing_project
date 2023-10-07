import classes from "./CustomStyle.module.css";

function CustomCheckbox({
  title,
  onTick,
  customStyle,
  isChecked,
  titleStyle,
  onChecboxChange,
}) {
  return (
    <>
      <div className={classes.checkbox}>
        <input
          type="checkbox"
          onClick={onTick}
          style={customStyle}
          checked={isChecked}
          onChange={onChecboxChange}
        />
        <div
          className={classes.title}
          style={titleStyle}
          onClick={onChecboxChange}
        >
          {title}
        </div>
      </div>
    </>
  );
}

export default CustomCheckbox;
