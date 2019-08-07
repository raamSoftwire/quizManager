import React, { Component } from "react";
import { QuizForm, QuizFormFields } from "./quizForm/quizForm";
import { db } from "../../firebase";
import { firestore } from "firebase";
import { Quiz } from "../../models/quiz";

export class CreatePage extends Component {
  quizzesCollection = db.collection('quizzes');

  render() {
    return (
      <QuizForm
        defaultQuiz={ undefined }
        submitButtonName={ "Create" }
        onSubmit={ (quiz: Quiz) => this.createQuiz(quiz) }/>
    )
  }

  private createQuiz = async (quiz: QuizFormFields) => {
    console.log(quiz);
    this.quizzesCollection.add({
      title: quiz.title,
      createdAt: firestore.FieldValue.serverTimestamp()
    })
  }
}
