import React, { Component } from "react";
import { Icon, Menu } from "antd";
import { Link } from "react-router-dom";
import style from "./layout.module.scss";
import logo from "./logo.png";
import { AuthButton } from "../index/authButton";

export class Navbar extends Component {
  render() {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: "64px" }}
        className={`${style.container} baseColor`}
      >
        <Menu.Item key="/logo">
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: "60px" }} />
          </Link>
        </Menu.Item>
        <Menu.Item key="/quizzes">
          <Link to="/">
            <Icon type="file" />
            Quizzes
          </Link>
        </Menu.Item>
        <Menu.Item key="/create">
          <Link to="/create">
            <Icon type="file-add" />
            Create a Quiz
          </Link>
        </Menu.Item>
        <Menu.Item key="/login" style={{ float: "right" }}>
          <AuthButton />
        </Menu.Item>
      </Menu>
    );
  }
}
