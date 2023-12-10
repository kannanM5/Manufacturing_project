import React from "react";
import { Modal } from "antd";
import classes from "../Components/CustomStyle.module.css";

function GlobalModal({
  title,
  isOpen,
  onCancel,
  children,
  CustomWidth = 1000,
  closeIcon = true,
}) {
  return (
    <div>
      <Modal
        maskClosable={false}
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
        closeIcon={closeIcon}
      >
        {title && <div className={classes.ModalLine}></div>}
        <div className={classes.container}>{children}</div>
      </Modal>
    </div>
  );
}

export default GlobalModal;
