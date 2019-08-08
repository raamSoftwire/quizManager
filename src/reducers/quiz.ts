import { initialState } from "../state";
import { reducerBuilder } from "./reducerBuilder";
import { LoadQuizzes } from "../actions";

export const quizReducer = reducerBuilder(initialState.quiz)
  .case(LoadQuizzes.async.started, state => ({
    ...state,
    isLoading: true
  }))
  .case(LoadQuizzes.async.failed, state => ({
    ...state,
    isLoading: false
  }))
  .case(LoadQuizzes.async.done, (state, { result }) => ({
    ...state,
    isLoading: false,
    data: result.quizzes.reduce(
      (quizzes, quiz) => ({
        ...quizzes,
        [quiz.uid]: quiz
      }),
      state.data
    )
  }))
  .build();
