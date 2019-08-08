import { initialState } from "../state";
import { reducerBuilder } from "./reducerBuilder";
import { AssignUser } from "../actions";

// @ts-ignore

export const userReducer = reducerBuilder(initialState.user)
  .case(AssignUser.async.done, (state, { result }) => ({
    ...state,
    data: { [result.uid]: result }
  }))
  .build();
