import { asyncActionCreator } from "./action";
import firebase from "firebase";
import { User } from "../models/user";
import { db } from "../firebase";
import { AsyncWorker } from "typescript-fsa-redux-thunk";
import { LoadableState } from "../state/loadable";
import { Quiz } from "../models/quiz";
import { push, RouterState } from "connected-react-router";

function parseUserQuerySnapshot(dispatch: any, querySnapshot: any): User {
  let users: User[] = [];
  querySnapshot.forEach((doc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    users = [...users, { ...doc.data(), uid: doc.id } as User];
  });
  dispatch(AssignUser.action(users[0]));
  return users[0];
}

let login: AsyncWorker<
  { email: string; password: string },
  User | void,
  { router: RouterState; quiz: LoadableState<Quiz>; user: LoadableState<User> }
> = (
  { email, password }: { email: string; password: string },
  dispatch,
  getState
) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      userCredential.user &&
        db
          .collection("users")
          .where(
            "email",
            "==",
            userCredential.user && userCredential.user.email
          )
          .limit(1)
          .get()
          .then(querySnapshot => {
            parseUserQuerySnapshot(dispatch, querySnapshot);
          })
          .then(() => dispatch(push("/")));
    });
};
export const Login = asyncActionCreator<
  { email: string; password: string },
  User | void
>("LOGIN", login);

export const AssignUser = asyncActionCreator<User, User>(
  "ASSIGN_USER",
  (user, dispatch, getState) => {
    return user;
  }
);

export const Logout = asyncActionCreator<null, void>(
  "LOG_OUT",
  (params, dispatch, getState) => {}
);
