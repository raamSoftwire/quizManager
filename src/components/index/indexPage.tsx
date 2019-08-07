import React, { Component, Fragment } from "react";
import { db } from '../../firebase';
import { Quiz } from "../../models/quiz";
import { Button, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import moment from "moment";
import { ContentRow } from "../shared/layout";
import { firestore } from "firebase";
import { DeleteButton } from "./deleteButton";

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
        defaultSortOrder: 'descend',
        sorter: (a: Quiz, b: Quiz) => moment(
          a.createdAt.toMillis()).diff(moment(b.createdAt.toMillis())),
        sortDirections: ["descend", "ascend"],
        render: (createdAt: firestore.Timestamp) =>
          createdAt && moment(createdAt.toMillis()).fromNow()
      },
      {
        title: "Actions",
        key: "action",
        render: (quiz: Quiz) => {
          return (
            <Fragment>
              <Button
                type="primary"
                style={ {marginRight: "10px"} }
                href={ `/${ quiz.uid }` }
              >
                View
              </Button>
              <DeleteButton quizUid={quiz.uid}/>
            </Fragment>
          )
        }
      }
    ];
  }

  componentDidMount() {
    this.quizzesCollection.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            quizzes: [...this.state.quizzes, {...doc.data(), uid: doc.id} as Quiz]
          })
        });
      })
  }

  render() {
    return <div>
      <ContentRow>
        <Table
          columns={ this.getQuizTableColumns() }
          dataSource={ this.state.quizzes }
          rowKey="uid"
        />
      </ContentRow>
    </div>
  }
}



