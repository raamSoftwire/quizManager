import React, { Component } from "react";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { push } from "connected-react-router";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import { connect } from "react-redux";
import { Logout } from "../../actions";
import { RootState } from "../../state";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import { Button } from "antd/es";

interface AuthButtonDispatchProps {
  push: (route: string) => void;
  logout: () => Promise<void>;
}

interface AuthButtonStateProps {
  isLoggedIn: boolean;
}

type AuthButtonProps = AuthButtonDispatchProps & AuthButtonStateProps;

class AuthButtonPresentational extends Component<AuthButtonProps> {
  isLoggedIn(): boolean {
    return this.props.isLoggedIn;
  }

  private handleLogout = () => {
    this.props.logout().then(() => this.props.push("/login"));
  };

  render() {
    return this.isLoggedIn() ? (
      <Button type="link" onClick={() => this.handleLogout()}>
        <Icon type="logout" />
        Logout
      </Button>
    ) : (
      <Link to="/login">
        <Icon type="login" />
        Login
      </Link>
    );
  }
}

function mapStateToProps(state: RootState): AuthButtonStateProps {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>
): AuthButtonDispatchProps {
  // @ts-ignore
  return bindActionCreators(
    {
      push,
      logout: thunkToAction(Logout.action)
    },
    dispatch
  );
}

export const AuthButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButtonPresentational);
