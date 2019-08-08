import { Quiz } from "../models/quiz";
import { LoadableState } from "./loadable";

type QuizState = LoadableState<Quiz>;

export const quizInitialState: QuizState = { isLoading: false, data: {} };
