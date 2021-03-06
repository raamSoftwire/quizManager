import React, { Fragment } from "react";
import { Quiz } from "../../models/quiz";
import { LoadableComponent, LoadableComponentProps } from "../shared/loadable";
import { Button, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import moment from "moment";
import { ContentRow } from "../shared/layout";
import { firestore } from "firebase";
import { DeleteButton } from "./deleteButton";
import { push } from "connected-react-router";
import { RootState } from "../../state";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import { LoadQuizzes } from "../../actions";
import { connect } from "react-redux";
import { handleError } from "../shared/error";
import { User } from "../../models/user";

interface IndexPageStateProps extends LoadableComponentProps {
  quizzes: Quiz[];
  user: User;
  isLoggedIn: boolean;
}

interface IndexPageDispatchProps {
  push: (route: string) => void;
  loadQuizzes: () => Promise<void>;
}

type IndexPageProps = IndexPageStateProps & IndexPageDispatchProps;

export class IndexPagePresentational extends LoadableComponent<IndexPageProps> {
  getQuizTableColumns(): ColumnProps<Quiz>[] {
    return [
      {
        title: "Quiz Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Date created",
        dataIndex: "createdAt",
        key: "createdAt",
        defaultSortOrder: "descend",
        sorter: (a: Quiz, b: Quiz) =>
          moment(a.createdAt.toMillis()).diff(moment(b.createdAt.toMillis())),
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
                style={{ marginRight: "10px" }}
                onClick={() => this.props.push(`/${quiz.uid}`)}
              >
                View
              </Button>
              {this.props.isLoggedIn &&
                this.props.user.permissionLevel === "edit" && (
                  <Fragment>
                    <Button
                      type="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.props.push(`edit/${quiz.uid}`)}
                    >
                      Edit
                    </Button>
                    <DeleteButton quizUid={quiz.uid} />
                  </Fragment>
                )}
            </Fragment>
          );
        }
      }
    ];
  }

  componentDidMount() {
    this.props
      .loadQuizzes()
      .catch(e => handleError("Error loading quizzes", e));
  }

  renderWhenLoaded() {
    return (
      <div>
        <ContentRow>
          <Table
            columns={this.getQuizTableColumns()}
            dataSource={this.props.quizzes}
            rowKey="uid"
          />
        </ContentRow>
      </div>
    );
  }
}

function mapStateToProps(state: RootState): IndexPageStateProps {
  return {
    quizzes: [...Object.values(state.quiz.data)],
    isLoading: state.quiz.isLoading,
    user: [...Object.values(state.user.data)][0],
    isLoggedIn: state.user.isLoggedIn
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>
): IndexPageDispatchProps {
  // @ts-ignore
  return bindActionCreators(
    {
      push,
      loadQuizzes: thunkToAction(LoadQuizzes.action)
    },
    dispatch
  );
}

export const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPagePresentational);
