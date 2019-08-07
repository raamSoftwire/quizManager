import { Component, default as React, ReactNode } from "react";
import { Form } from "antd";
import { FormItemProps } from "antd/lib/form";
import { GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { FormContext } from "./formContext";

interface DecoratedFormItemProps<T> extends FormItemProps {
  fieldName: keyof T;
  options?: GetFieldDecoratorOptions;
}

export class DecoratedFormItem<T> extends Component<
  DecoratedFormItemProps<T>,
  {}
> {
  render(): ReactNode {
    const { fieldName, options, children, ...rest } = this.props;

    return (
      <FormContext.Consumer>
        {form => (
          <Form.Item {...rest}>
            {!!form
              ? form.getFieldDecorator(fieldName, options)(children)
              : children}
          </Form.Item>
        )}
      </FormContext.Consumer>
    );
  }
}
