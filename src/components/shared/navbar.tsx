import React, { Component } from "react";
import { Icon, Menu } from "antd";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: "64px" }}
      >
          <Menu.Item key="/quizzes">
            <Link to="/"><Icon type="file" />Quizzes</Link>
          </Menu.Item>
          <Menu.Item key="/create">
            <Link to="/create"><Icon type="file-add" />Create a Quiz</Link>
          </Menu.Item>
      </Menu>
    );
  }
}
