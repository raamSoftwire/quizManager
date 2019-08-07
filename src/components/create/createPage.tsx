import React, { Component } from "react";
import { QuizForm, QuizFormFields } from "./quizForm/quizForm";
import { db } from "../../firebase";
import { firestore } from "firebase";

export class CreatePage extends Component {
  quizzesCollection = db.collection('quizzes');

  render() {
    return (
      <QuizForm
        defaultQuiz={ undefined }
        submitButtonName={ "Create" }
        onSubmit={ (quiz: QuizFormFields) => this.createQuiz(quiz) }/>
    )
  }

  private createQuiz = async (quiz: QuizFormFields) => {
    const quizRef = await this.quizzesCollection.add({
      title: quiz.title,
      createdAt: firestore.FieldValue.serverTimestamp()
    });
    const questionCollection = this.quizzesCollection.doc(quizRef.id);
    await quiz.questions.map(question => {
      questionCollection.collection('questions').add(question)
    })
  }
}
