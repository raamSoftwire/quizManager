import React, { Component, Fragment } from "react";
import { Question } from "../../models/question";
import Title from "antd/es/typography/Title";
import { Collapse } from "antd";
import { RootState } from "../../state";
import { connect } from "react-redux";
import { IndexPagePresentational } from "../index/indexPage";
import { LoadableComponentProps } from "../shared/loadable";
import { User } from "../../models/user";
const { Panel } = Collapse;

interface QuestionComponentOwnProps {
  question: Question;
  order: number;
  key: number;
}

interface QuestionComponentStateProps extends LoadableComponentProps {
  user: User;
  isLoggedIn: boolean;
}

type QuestionComponentProps = QuestionComponentOwnProps &
  QuestionComponentStateProps;

export class QuestionComponentPresentational extends Component<
  QuestionComponentProps
> {
  render() {
    return (
      <Fragment>
        <Title level={4}>
          {`${this.props.order}. ${this.props.question.text}`}
        </Title>
        {this.props.isLoggedIn &&
          this.props.user.permissionLevel !== "restricted" && (
            <Collapse>
              <Panel header="See answers" key="1">
                <p>{`A. ${this.props.question.correctAnswer}`}</p>
                <p>{`B. ${this.props.question.alternativeAnswer1}`}</p>
                <p>{`C. ${this.props.question.alternativeAnswer2}`}</p>
                {this.props.question.alternativeAnswer3 && (
                  <p>{`D. ${this.props.question.alternativeAnswer3}`}</p>
                )}
                {this.props.question.alternativeAnswer4 && (
                  <p>{`E. ${this.props.question.alternativeAnswer4}`}</p>
                )}
              </Panel>
            </Collapse>
          )}
      </Fragment>
    );
  }
}

function mapStateToProps(state: RootState): QuestionComponentStateProps {
  return {
    user: [...Object.values(state.user.data)][0],
    isLoggedIn: state.user.isLoggedIn,
    isLoading: false
  };
}

export const QuestionComponent = connect(
  mapStateToProps,
  null
)(QuestionComponentPresentational);
