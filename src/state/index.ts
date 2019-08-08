import { routerInitialState } from "./router";
import { quizInitialState } from "./quiz";
import { userInitialState } from "./user";

export const initialState = {
  router: routerInitialState,
  quiz: quizInitialState,
  user: userInitialState
};

export type RootState = typeof initialState;
