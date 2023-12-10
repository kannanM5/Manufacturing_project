import { Tooltip } from "antd";
import React from "react";

const CustomToolTip = ({ title, placement = "top", children }) => {
  return (
    <Tooltip
      placement={placement}
      title={title}
      overlayStyle={{ fontSize: "12px" }}
    >
      {children}
    </Tooltip>
  );
};

export default CustomToolTip;
