import { asyncActionCreator } from "./action";
import { Quiz } from "../models/quiz";
import { db } from "../firebase";
import { QuizFormFields } from "../components/create/quizForm/quizForm";
import { firestore } from "firebase";

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

export const DeleteQuiz = asyncActionCreator<{ quizUid: string }, void>(
  "DELETE_QUIZ",
  ({ quizUid }, dispatch, getState) => {
    const questionCollection = quizzesCollection
      .doc(quizUid)
      .collection("questions");

    questionCollection
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => questionCollection.doc(doc.id).delete())
      )
      .then(() => quizzesCollection.doc(quizUid).delete());
  }
);

export const CreateQuiz = asyncActionCreator<{ quiz: QuizFormFields }, void>(
  "CREATE_QUIZ",
  async ({ quiz }, dispatch, getState) => {
    const quizRef = await quizzesCollection.add({
      title: quiz.title,
      createdAt: firestore.FieldValue.serverTimestamp()
    });
    const questionCollection = quizzesCollection.doc(quizRef.id);
    await quiz.questions.map(question => {
      return questionCollection.collection("questions").add(question);
    });
  }
);

export const EditQuiz = asyncActionCreator<
  { quizUid: string; quiz: QuizFormFields },
  void
>("EDIT_QUIZ", async ({ quizUid, quiz }, dispatch, getState) => {
  quizzesCollection.doc(quizUid).update({
    title: quiz.title
  });

  const questionCollection = quizzesCollection
    .doc(quizUid)
    .collection("questions");
  await questionCollection
    .get()
    .then(querySnapshot =>
      querySnapshot.forEach(doc => questionCollection.doc(doc.id).delete())
    );
  await quiz.questions.map(question => {
    return questionCollection.add(question);
  });
});
