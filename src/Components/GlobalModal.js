import { Dialog, DialogContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  GlobalModal: {
    "&>div": {
      height: "100vh",
      backgroundColor: "red",
      display: "flex",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));
export default function GlobalModal({
  isVisible = false,
  setIsVisible,
  children,
  size = "md",
  customStyle,
  ModalStyle,
}) {
  const classes = useStyles();
  return (
    <Dialog
      open={isVisible}
      maxWidth={size}
      onClose={() => {
        if (setIsVisible) setIsVisible(false);
      }}
      style={customStyle}
      className={`${ModalStyle} globalModal` || "globalModal"}
    >
      <DialogContent style={customStyle}>{children}</DialogContent>
    </Dialog>
  );
}
