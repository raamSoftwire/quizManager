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
      >
        Delete
      </Button>
    );
  }

  private deleteQuiz = async (quizUid: string) => {
    const quizzesCollection = db.collection('quizzes');

    const questionCollection = quizzesCollection.doc(this.props.quizUid).collection('questions');
    await questionCollection.get()
      .then(querySnapshot => querySnapshot.forEach(doc =>
          questionCollection.doc(doc.id).delete()
        )
      );
    await quizzesCollection.doc(quizUid).delete();
  }
}
