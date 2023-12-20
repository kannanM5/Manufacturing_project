import classes from "./CustomStyle.module.css";

export default function Loader({ isVisible = true }) {
  return (
    <>
      {isVisible ? (
        <div className={classes.loaderParent}>
          <div className={classes.loader}></div>
        </div>
      ) : null}
    </>
  );
}
