import React, { Component } from "react";
import { QuizForm, QuizFormFields } from "./quizForm/quizForm";
import { db } from "../../firebase";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { push } from "connected-react-router";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import { CreateQuiz } from "../../actions";
import { connect } from "react-redux";

interface CreatePageDispatchProps {
  push: (route: string) => void;
  createQuiz: (params: { quiz: QuizFormFields }) => Promise<void>;
}

class CreatePagePresentational extends Component<CreatePageDispatchProps> {
  quizzesCollection = db.collection("quizzes");

  render() {
    return (
      <QuizForm
        defaultQuiz={undefined}
        submitButtonName={"Create"}
        onSubmit={(quiz: QuizFormFields) => this.handleCreate(quiz)}
      />
    );
  }

  private handleCreate = (quiz: QuizFormFields) => {
    this.props.createQuiz({ quiz }).then(() => this.props.push("/"));
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>
): CreatePageDispatchProps {
  // @ts-ignore
  return bindActionCreators(
    {
      push,
      createQuiz: thunkToAction(CreateQuiz.action)
    },
    dispatch
  );
}

export const CreatePage = connect(
  null,
  mapDispatchToProps
)(CreatePagePresentational);
