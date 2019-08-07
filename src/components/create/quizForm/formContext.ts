import { default as React } from "react";
import { WrappedFormUtils } from "antd/lib/form/Form";

export const FormContext = React.createContext<WrappedFormUtils | undefined>(
  undefined
);

export const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

export const formLayoutWithoutLabel = {
  ...formLayout,
  wrapperCol: {
    ...formLayout.wrapperCol,
    sm: {
      ...formLayout.wrapperCol.sm,
      offset: 6
    }
  }
};
