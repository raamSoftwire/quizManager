import React, { Component } from "react";
import { QuizForm, QuizFormFields } from "./quizForm";
import { FormComponentProps } from "antd/es/form";
import { Form } from "antd";

interface CreateQuizFormState {
  submitting: boolean;
}

class CreatePagePresentational extends Component<FormComponentProps, CreateQuizFormState> {
  state = {
    submitting: false
  };

  render() {
    return (
      <QuizForm
        form={ this.props.form }
        submitting={ this.state.submitting }
        handleUpdate={ this.createQuiz }/>
    )
  }

  private createQuiz = async (quiz: QuizFormFields) => console.log(quiz)
}

export const CreatePage = Form.create({name: "createQuiz"})(CreatePagePresentational);

