import React, { Component } from "react";
import { QuizForm, QuizFormFields } from "./quizForm";
import { FormComponentProps } from "antd/es/form";
import { Form } from "antd";
import { db } from "../firebase";
import { firestore } from "firebase";

interface CreateQuizFormState {
  submitting: boolean;
}

class CreatePagePresentational extends Component<FormComponentProps, CreateQuizFormState> {
  state = {
    submitting: false
  };

  quizzesCollection = db.collection('quizzes');

  render() {
    return (
      <QuizForm
        form={ this.props.form }
        submitting={ this.state.submitting }
        handleUpdate={ this.createQuiz }/>
    )
  }

  private createQuiz = async (quiz: QuizFormFields) => {
    this.quizzesCollection.add({
      title: quiz.title,
      createdAt: firestore.FieldValue.serverTimestamp()
    })
  }
}

export const CreatePage = Form.create({name: "createQuiz"})(CreatePagePresentational);

