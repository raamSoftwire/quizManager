import React, { Component } from "react";
import { Icon, Menu } from "antd";
import style from "./layout.module.scss";
import logo from "./logo.png";
import { AuthButton } from "../index/authButton";
import { push } from "connected-react-router";
import { RootState } from "../../state";
import { AnyAction, Dispatch, bindActionCreators } from "redux";
import { ResetStore } from "../../actions";
import { connect } from "react-redux";
import { User } from "../../models/user";

interface NavbarStateProps {
  isLoggedIn: boolean;
  currentPage: string;
  user: User;
}

interface NavbarDispatchProps {
  push: (route: string) => void;
  logout: () => void;
}

type NavbarProps = NavbarStateProps & NavbarDispatchProps;

export class NavbarPresentational extends Component<NavbarProps> {
  onMenuClick(e: { key: string }) {
    this.props.push(e.key);
  }

  render() {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: "64px" }}
        onClick={e => this.onMenuClick(e)}
        className={`${style.container} baseColor`}
      >
        <Menu.Item key="/">
          <img src={logo} alt="Logo" style={{ height: "60px" }} />
        </Menu.Item>
        <Menu.Item key="/">
          <Icon type="file" />
          Quizzes
        </Menu.Item>
        {this.props.isLoggedIn && this.props.user.permissionLevel === "edit" && (
          <Menu.Item key="/create">
            <Icon type="file-add" />
            Create a Quiz
          </Menu.Item>
        )}
        <Menu.Item key="/login" style={{ float: "right" }}>
          <AuthButton />
        </Menu.Item>
      </Menu>
    );
  }
}
function mapStateToProps(state: RootState): NavbarStateProps {
  return {
    isLoggedIn: state.user.isLoggedIn,
    currentPage: state.router.location.pathname,
    user: [...Object.values(state.user.data)][0]
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>
): NavbarDispatchProps {
  return bindActionCreators(
    {
      push,
      logout: ResetStore
    },
    dispatch
  );
}

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarPresentational);
