import { connectRouter } from "connected-react-router";
import { combineReducers, Reducer } from "redux";
import { RootState } from "../state";
import { browserHistory } from "../browserHistory";

import { quizReducer } from "./quiz";

type ReducerMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [SubStateKey in keyof RootState]: Reducer<RootState[SubStateKey], any>;
};

/**
 * Better typed version of combineReducer function configured to create the RootState reducer.
 */
function createRootReducer(reducers: ReducerMap): Reducer<RootState> {
  return combineReducers<RootState>(reducers);
}

export const rootReducer = createRootReducer({
  router: connectRouter(browserHistory),
  quiz: quizReducer
});
