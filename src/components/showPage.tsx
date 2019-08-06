import React, { Component } from "react";
import { Quiz } from "../models/quiz";
import { db } from "../firebase";
import { RouteComponentProps } from "react-router";
import { ContentRow } from "./layout";
import { Question } from "../models/question";
import { QuestionComponent } from "./questionComponent";
import Title from "antd/es/typography/Title";

interface ShowPageState {
  quiz?: Quiz;
  questions?: Question[];
}

export class ShowPage extends Component<RouteComponentProps, ShowPageState> {
  state = {
    quiz: undefined,
    questions: []
  };

  quizzesCollection = db.collection('quizzes');

  async loadQuiz() {
    // @ts-ignore
    const quizSnapshot = await this.quizzesCollection.doc(this.props.match.params.quizUid).get();
    this.setState({quiz: quizSnapshot.data() as Quiz});

    quizSnapshot.ref.collection("questions").get()
      .then(querySnapshot => {
        querySnapshot.forEach(question => {
          // @ts-ignore
          this.setState({
            questions: [...this.state.questions, question.data() as Question]
          })
        })
      }
    )
  }

  componentDidMount() {
    this.loadQuiz()
  }

  render() {

    // @ts-ignore
    return (
      <ContentRow>
        <Title>{
          // @ts-ignore
          this.state.quiz && this.state.quiz.title }
        </Title>
        {this.state.questions.map((question: Question, index)  => (
          <QuestionComponent key={index} question={question} order={index + 1} />
        ))}
      </ContentRow>
    )
  }
}



