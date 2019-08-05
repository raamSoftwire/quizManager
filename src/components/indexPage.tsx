import firebase from "firebase";
import React, { Component } from "react";
import { db } from '../firebase';
import { Quiz } from "../models/quiz";
import { Button, Row, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import moment from "moment";

interface IndexPageState {
  quizzes: Quiz[];
}
export class IndexPage extends Component<IndexPageState> {
  state = {
    quizzes: []
  };

  quizzesCollection = db.collection('quizzes');

  getQuizTableColumns(): ColumnProps<Quiz>[] {
    return [
      {
        title: "Quiz Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Date created",
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: (a: Quiz, b: Quiz) => moment(a.createdAt).diff(moment(b.createdAt)),
        sortDirections: ["descend", "ascend"],
        render: (createdAt: firebase.firestore.Timestamp) =>
          moment(createdAt.toMillis())
            .fromNow()
      },
      {
        title: "Actions",
        key: "action",
        render: (quiz: Quiz) => {
          return <Button
            type="primary"
            style={ {marginRight: "10px"} }
            href={`/${quiz.uid}`}
          >
            View
          </Button>
        }
      }
    ];
  }

  componentDidMount() {
    this.quizzesCollection.get()
      .then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
          this.setState({
            quizzes: [...this.state.quizzes, {...doc.data(), uid: doc.id} as Quiz]
          })
        });
      })
  }

  render() {
    return <div>
      <Row
        gutter={16}
        style={{ background: "#ffffff", padding: "32px" }}
      >
        <Table
          columns={this.getQuizTableColumns()}
          dataSource={this.state.quizzes}
          rowKey="uid"
        />
      </Row>
    </div>
  }
}



