import { Button, Form, Icon, Input } from "antd";
import React, { Component } from "react";
import { FormComponentProps } from "antd/es/form";
import { ContentRow } from "../shared/layout";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { push } from "connected-react-router";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import { Login } from "../../actions";
import { connect } from "react-redux";
import { User } from "../../models/user";

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

interface LoginPageDispatchProps {
  push: (route: string) => void;
  login: (params: { email: string; password: string }) => Promise<User | void>;
}

type LoginPageProps = FormComponentProps & LoginPageDispatchProps;

class LoginPageStructure extends Component<LoginPageProps> {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .login({ email: values.email, password: values.password })
          .then(() => this.props.push("/"));
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched("email") && getFieldError("email");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <ContentRow>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={usernameError ? "error" : ""}
            help={usernameError || ""}
          >
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email address" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email address"
              />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? "error" : ""}
            help={passwordError || ""}
          >
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your password" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </ContentRow>
    );
  }
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>
): LoginPageDispatchProps {
  // @ts-ignore
  return bindActionCreators(
    {
      push,
      login: thunkToAction(Login.action)
    },
    dispatch
  );
}

export const LoginPage = connect(
  null,
  mapDispatchToProps
)(Form.create({ name: "loginPage" })(LoginPageStructure));
