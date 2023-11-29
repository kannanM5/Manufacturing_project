import React from "react";
import { Modal } from "antd";
import classes from "../Components/CustomStyle.module.css";

function GlobalModal({
  title,
  isOpen,
  onCancel,
  children,
  CustomWidth = 1000,
}) {
  return (
    <div>
      <Modal
        destroyOnClose
        title={
          <div className={classes.popup_head_left}>
            {title && <div className={classes.line}></div>}
            <div>
              <p className={classes.Heading}>{title}</p>
            </div>
          </div>
        }
        open={isOpen}
        onCancel={onCancel}
        centered
        footer={null}
        width={CustomWidth}
      >
        {title && <div className={classes.ModalLine}></div>}
        <div className={classes.container}>{children}</div>
      </Modal>
    </div>
  );
}

export default GlobalModal;
