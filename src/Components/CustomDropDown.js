import { Button, Dropdown, Space } from "antd";
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import classes from "./CustomStyle.module.css";

function CustomDropDown({
  items,
  title,
  errorText,
  requiredText,
  onSelect,
  value,
  placeholderText,
}) {
  const getByPlaceholderText = () => {
    return `Select ${placeholderText}`;
  };

  const getValue = () => {
    if (value) {
      return <p>{value}</p>;
    }

    return <p className={classes.placeholder}>{getByPlaceholderText()}</p>;
  };

  const onClick = (value) => {
    if (onSelect) onSelect(value?.key);
  };

  return (
    <div>
      <p className={classes.title}>
        {title} <span className={classes.star}>{requiredText}</span>
      </p>
      <div className={classes.dropdonwContainer}>
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <Button>
            <Space className={classes.btnTextAndArrow}>
              {getValue()}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      {errorText ? (
        <p className={classes.errorTxt}>{errorText.toString()}</p>
      ) : null}
    </div>
  );
}

export default CustomDropDown;
