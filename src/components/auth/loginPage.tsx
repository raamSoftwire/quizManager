import { Button, Form, Icon, Input } from 'antd';
import React, { Component } from "react";
import { FormComponentProps } from "antd/es/form";
import { ContentRow } from "../shared/layout";
import firebase from 'firebase';

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPageStructure extends Component<FormComponentProps> {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password )
          .then(userCredential =>
            console.log(`User credential: ${userCredential.user && userCredential.user.email}`))
          .catch(function(error: any) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });

        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <ContentRow>
        <Form layout="inline" onSubmit={ this.handleSubmit }>
          <Form.Item validateStatus={ usernameError ? 'error' : '' } help={ usernameError || '' }>
            { getFieldDecorator('email', {
              rules: [{required: true, message: 'Please input your email address'}],
            })(
              <Input
                prefix={ <Icon type="user" style={ {color: 'rgba(0,0,0,.25)'} }/> }
                placeholder="Email address"
              />,
            ) }
          </Form.Item>
          <Form.Item validateStatus={ passwordError ? 'error' : '' } help={ passwordError || '' }>
            { getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your password'}],
            })(
              <Input
                prefix={ <Icon type="lock" style={ {color: 'rgba(0,0,0,.25)'} }/> }
                type="password"
                placeholder="Password"
              />,
            ) }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={ hasErrors(getFieldsError()) }>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </ContentRow>
    );
  }
}

export const LoginPage = Form.create({name: 'loginPage'})(LoginPageStructure);

