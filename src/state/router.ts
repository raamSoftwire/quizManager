import { RouterState } from "connected-react-router";
import { browserHistory } from "../browserHistory";

export const routerInitialState: RouterState = {
  location: browserHistory.location,
  action: browserHistory.action
};
