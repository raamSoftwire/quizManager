import { routerInitialState } from "./router";
import { quizInitialState } from "./quiz";

export const initialState = {
  router: routerInitialState,
  quiz: quizInitialState
};

export type RootState = typeof initialState;
