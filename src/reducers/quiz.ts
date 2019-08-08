import { initialState } from "../state";
import { reducerBuilder } from "./reducerBuilder";
import { DeleteQuiz, LoadQuizzes } from "../actions";

// @ts-ignore
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
  .case<{
    params: {
      quizUid: string;
    };
  }>(DeleteQuiz.async.done, (state: any, { params }) => ({
    ...state,
    data: Object.keys(state.data)
      .filter(key => key !== params.quizUid)
      .reduce((obj, key) => {
        // @ts-ignore
        obj[key] = state.data[key];
        return obj;
      }, {})
  }))
  .build();
