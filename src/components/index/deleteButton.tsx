import React, { Component } from "react";
import { Button } from "antd";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { push } from "connected-react-router";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import { DeleteQuiz } from "../../actions";
import { connect } from "react-redux";

interface DeleteButtonOwnProps {
  quizUid: string;
}

interface DeleteButtonDispatchProps {
  push: (route: string) => void;
  deleteQuiz: (params: { quizUid: string }) => Promise<void>;
}

type DeleteButtonProps = DeleteButtonOwnProps & DeleteButtonDispatchProps;

class DeleteButtonPresentational extends Component<DeleteButtonProps> {
  render() {
    return (
      <Button
        type="danger"
        onClick={() => this.handleDelete(this.props.quizUid)}
      >
        Delete
      </Button>
    );
  }

  private handleDelete = async (quizUid: string) => {
    this.props.deleteQuiz({ quizUid });
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>
): DeleteButtonDispatchProps {
  // @ts-ignore
  return bindActionCreators(
    {
      push,
      deleteQuiz: thunkToAction(DeleteQuiz.action)
    },
    dispatch
  );
}

export const DeleteButton = connect(
  null,
  mapDispatchToProps
)(DeleteButtonPresentational);
