import React, { Component } from "react";
import { QuizForm, QuizFormFields } from "./quizForm/quizForm";
import { db } from "../../firebase";
import { Quiz } from "../../models/quiz";
import { Question } from "../../models/question";

export class EditPage extends Component {
  state = {
    quiz: {} as Quiz,
  };

  quizzesCollection = db.collection('quizzes');
  // @ts-ignore
  quizUid = this.props.match.params.quizUid;

  async loadQuiz() {
    // @ts-ignore
    const quizSnapshot = await this.quizzesCollection.doc(this.quizUid).get();
    this.setState({quiz: {...quizSnapshot.data(), uid: this.quizUid, questions: [] as Question[]} as Quiz});

    quizSnapshot.ref.collection("questions").get()
      .then(querySnapshot => {
          querySnapshot.forEach(question => {
            if (this.state.quiz && this.state.quiz.questions) {
              // @ts-ignore
              this.setState({
                quiz: {...(this.state.quiz as Quiz), questions: [...this.state.quiz.questions, question.data()]}
              })
            }
          })
        }
      )
  }

  componentDidMount() {
    this.loadQuiz()
  }

  render() {
    return (
      <QuizForm
        defaultQuiz={ this.state.quiz }
        submitButtonName={ "Edit" }
        onSubmit={ (quiz: QuizFormFields) => this.editQuiz(quiz) }/>
    )
  }

  private editQuiz = async (quiz: QuizFormFields) => {

    this.quizzesCollection.doc(this.quizUid).update({
      title: quiz.title,
    });

    const questionCollection = this.quizzesCollection.doc(this.quizUid).collection('questions');
    await questionCollection.get()
      .then(querySnapshot => querySnapshot.forEach(doc =>
        questionCollection.doc(doc.id).delete()
      )
    );
    await quiz.questions.map(question => {
      return questionCollection.add(question)
    })
  }
}
