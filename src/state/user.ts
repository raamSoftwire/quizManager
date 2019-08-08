import { User } from "../models/user";
import { LoadableState } from "./loadable";

type UserState = LoadableState<User> & { isLoggedIn: boolean };

export const userInitialState: UserState = {
  isLoading: false,
  data: {},
  isLoggedIn: false
};
