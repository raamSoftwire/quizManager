import React, { Component, Fragment } from "react";
import { Question } from "../models/question";
import Title from "antd/es/typography/Title";
import { Collapse } from "antd";
const { Panel } = Collapse;

interface QuestionComponentProps {
  question: Question;
  order: number;
  key: number;
}

export class QuestionComponent extends Component<QuestionComponentProps> {
  render() {
    return (
      <Fragment>
        <Title level={4}>
          {`${this.props.order}. ${this.props.question.text}`}
        </Title>
        <Collapse>
          <Panel header="See answers" key="1">
            <p>{`A. ${this.props.question.correctAnswer}`}</p>
            <p>{`B. ${this.props.question.alternativeAnswer1}`}</p>
            <p>{`C. ${this.props.question.alternativeAnswer2}`}</p>
            {this.props.question.alternativeAnswer3 &&
            <p>{`D. ${this.props.question.alternativeAnswer3}`}</p>}
            {this.props.question.alternativeAnswer4 &&
            <p>{`E. ${this.props.question.alternativeAnswer4}`}</p>}
          </Panel>
        </Collapse>
      </Fragment>
    )
  }
}



