import React, { Component } from "react";
import { Button } from "antd";
import { db } from "../../firebase";

interface DeleteButtonProps {
  quizUid: string;
}

export class DeleteButton extends Component<
  DeleteButtonProps
  > {

  render() {
    return (
      <Button
        type="danger"
        onClick={() => this.deleteQuiz(this.props.quizUid) }
        href={'/'}
      >
        Delete
      </Button>
    );
  }

  private deleteQuiz = async (quizUid: string) => {
    const quizzesCollection = db.collection('quizzes');
    await quizzesCollection.doc(quizUid).delete();
  }
}
