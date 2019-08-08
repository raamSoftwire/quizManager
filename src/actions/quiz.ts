import { asyncActionCreator } from "./action";
import { Quiz } from "../models/quiz";
import { db } from "../firebase";

const quizzesCollection = db.collection("quizzes");

function parseQuizQuerySnapshot(querySnapshot: any): Quiz[] {
  let quizzes: Quiz[] = [];
  querySnapshot.forEach((doc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    quizzes = [...quizzes, { ...doc.data(), uid: doc.id } as Quiz];
  });
  return quizzes;
}

export const LoadQuizzes = asyncActionCreator<null, { quizzes: Quiz[] }>(
  "LOAD_QUIZZES",
  (params, dispatch, getState) =>
    quizzesCollection.get().then(querySnaphot => ({
      quizzes: parseQuizQuerySnapshot(querySnaphot)
    }))
);
