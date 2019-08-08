import React, { Component } from "react";
import { QuizForm, QuizFormFields } from "./quizForm/quizForm";
import { Quiz } from "../../models/quiz";
import { Question } from "../../models/question";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { push } from "connected-react-router";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import { EditQuiz } from "../../actions";
import { connect } from "react-redux";
import { firestore } from "firebase";
import { db } from "../../firebase";

interface EditPageDispatchProps {
  push: (route: string) => void;
  editQuiz: (params: {
    quizUid: string;
    quiz: QuizFormFields;
  }) => Promise<void>;
}

export class EditPagePresentational extends Component<EditPageDispatchProps> {
  state = {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    quiz: {} as Quiz
  };

  // @ts-ignore
  quizUid = this.props.match.params.quizUid;
  quizzesCollection = db.collection("quizzes");

  async loadQuiz() {
    // @ts-ignore
    const quizSnapshot = await this.quizzesCollection.doc(this.quizUid).get();
    this.setState({
      // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
      quiz: {
        ...quizSnapshot.data(),
        uid: this.quizUid,
        questions: [] as Question[]
      } as Quiz
    });

    quizSnapshot.ref
      .collection("questions")
      .get()
      .then((querySnapshot: firestore.QuerySnapshot) => {
        querySnapshot.forEach((question: firestore.QueryDocumentSnapshot) => {
          if (this.state.quiz && this.state.quiz.questions) {
            // @ts-ignore
            this.setState({
              quiz: {
                ...(this.state.quiz as Quiz),
                questions: [...this.state.quiz.questions, question.data()]
              }
            });
          }
        });
      });
  }

  componentDidMount() {
    this.loadQuiz();
  }

  render() {
    return (
      <QuizForm
        defaultQuiz={this.state.quiz}
        submitButtonName={"Edit"}
        onSubmit={(quiz: QuizFormFields) => this.handleEdit(this.quizUid, quiz)}
      />
    );
  }

  private handleEdit = async (quizUid: string, quiz: QuizFormFields) => {
    this.props.editQuiz({ quizUid, quiz }).then(() => this.props.push("/"));
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>
): EditPageDispatchProps {
  // @ts-ignore
  return bindActionCreators(
    {
      push,
      editQuiz: thunkToAction(EditQuiz.action)
    },
    dispatch
  );
}

export const EditPage = connect(
  null,
  mapDispatchToProps
)(EditPagePresentational);
