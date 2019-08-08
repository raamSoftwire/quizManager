import { User } from "../models/user";
import { LoadableState } from "./loadable";

type UserState = LoadableState<User>;

export const userInitialState: UserState = { isLoading: false, data: {} };
