import React, { Component } from "react";
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Classes,
  Alignment,
  Button
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import "./Layout.scss";
import { history } from "../App";

const Layout = (Component: React.FC, title: string, create_path?: string) => {
  return (
    <div>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>{title}</NavbarHeading>
        </NavbarGroup>
        {create_path && (
          <NavbarGroup align={Alignment.RIGHT}>
            <NavbarDivider />
            <Button
              className={Classes.MINIMAL}
              icon={IconNames.ADD}
              onClick={() => {
                history.push(`${create_path}`);
              }}
              text="Создать"
            />
          </NavbarGroup>
        )}
      </Navbar>
      <div className="cra_layout">
        <Component />
      </div>
    </div>
  );
};

export default Layout;
