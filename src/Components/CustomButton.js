import classes from "./CustomStyle.module.css";

export default function CustomButton({
  title = "",
  onButtonPress,
  customButtonStyle,
  buttonProps,
}) {
  return (
    <div className={classes.btn}>
      <button
        type="button"
        {...buttonProps}
        onClick={onButtonPress}
        style={customButtonStyle}
      >
        {title}
      </button>
    </div>
  );
}
