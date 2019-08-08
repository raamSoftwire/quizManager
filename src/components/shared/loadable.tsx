import * as React from "react";
import { Spin } from "antd";

export interface LoadableComponentProps {
  isLoading: boolean;
}

export abstract class LoadableComponent<
  P extends LoadableComponentProps,
  S = {}
> extends React.Component<P, S> {
  render(): React.ReactNode {
    if (this.props.isLoading) {
      return (
        <div style={{ textAlign: "center", height: "100%" }}>
          <Spin
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        </div>
      );
    }
    return this.renderWhenLoaded();
  }

  abstract renderWhenLoaded(): React.ReactNode;
}
