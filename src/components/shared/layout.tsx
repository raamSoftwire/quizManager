import { Row } from "antd";
import React from "react";
import { RowProps } from "antd/lib/row";

export const ContentRow: React.FC<RowProps> = props => {
  const { children, ...rest } = props;
  return (
    <Row
      gutter={16}
      style={{ background: "#ffffff", padding: "32px" }}
      {...rest}
    >
      {children}
    </Row>
  );
};
