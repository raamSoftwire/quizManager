import React, { Component } from "react";
import { Icon, Menu } from "antd";

export class Navbar extends Component {
  render() {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: "64px" }}
      >
          <Menu.Item key="/quizzes">
            <Icon type="file" />
            Quizzes
          </Menu.Item>
          <Menu.Item key="/create">
            <Icon type="file-add" />
            Create
          </Menu.Item>
        <Menu.Item key="/auth/login" style={{ float: "right" }}>
          <Icon type="logout" />
          Logout
          </Menu.Item>
      </Menu>
    );
  }
}
