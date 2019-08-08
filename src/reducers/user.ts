import { initialState } from "../state";
import { reducerBuilder } from "./reducerBuilder";
import { AssignUser, Logout } from "../actions";

// @ts-ignore

export const userReducer = reducerBuilder(initialState.user)
  .case(AssignUser.async.done, (state, { result }) => ({
    ...state,
    isLoggedIn: true,
    data: { [result.uid]: result }
  }))
  .case(Logout.async.done, (state, { result }) => ({
    ...state,
    isLoggedIn: false,
    data: {}
  }))
  .build();
