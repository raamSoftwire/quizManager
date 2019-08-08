import React, { Component } from "react";
import { Quiz } from "../../models/quiz";
import { db } from "../../firebase";
import { RouteComponentProps } from "react-router";
import { ContentRow } from "../shared/layout";
import { Question } from "../../models/question";
import { QuestionComponent } from "./questionComponent";
import Title from "antd/es/typography/Title";

interface ShowPageState {
  quiz?: Quiz;
}

export class ShowPage extends Component<RouteComponentProps, ShowPageState> {
  state = {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    quiz: {} as Quiz
  };

  quizzesCollection = db.collection("quizzes");
  // @ts-ignore
  quizUid = this.props.match.params.quizUid;

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
      .then(querySnapshot => {
        querySnapshot.forEach(question => {
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
    // @ts-ignore
    return (
      <ContentRow>
        <Title>
          {// @ts-ignore
          this.state.quiz && this.state.quiz.title}
        </Title>
        {this.state.quiz.questions &&
          this.state.quiz.questions.map((question: Question, index) => (
            <QuestionComponent
              key={index}
              question={question}
              order={index + 1}
            />
          ))}
      </ContentRow>
    );
  }
}
