import React from "react";
import { SvgIcon } from "@material-ui/core";
import "./Header.scss";
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';

const Header = () => {
  return (
    <div className="header">
      <span>
        <SvgIcon
          component={MenuBookTwoToneIcon}
          viewBox="0 0 20 20"
          style={{ color: "#27AE60", paddingRight: "1px" }}
        />
      </span>

      <span className="header_title">Reference book</span>
    </div>
  );
};

export default Header;