import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { RootState } from "./state";
import { connect } from "react-redux";

interface PrivateRouteProps<P> extends RouteProps {
  component: React.ComponentType<P>;
}

interface PrivateComponentStateProps {
  isLoggedIn: boolean;
}

type PrivateComponentProps<P> = P & PrivateComponentStateProps;

export function PrivateRoute<P>({
  component: Component,
  ...rest
}: PrivateRouteProps<P>) {
  const UnconnectedPrivateComponent: React.FC<
    PrivateComponentProps<P>
  > = props => {
    if (!props.isLoggedIn) {
      const redirectParam = rest.location
        ? `?redirect=${rest.location.pathname}`
        : "";
      return <Redirect to={`/login${redirectParam}`} />;
    }

    return <Component {...props} />;
  };

  const mapStateToProps = (state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn
  });

  const PrivateComponent = connect(mapStateToProps)(
    // @ts-ignore - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31363
    UnconnectedPrivateComponent
  );

  return <Route {...rest} component={PrivateComponent} />;
}
