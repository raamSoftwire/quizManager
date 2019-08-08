import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { RootState } from "../state";

export const actionCreator = actionCreatorFactory();

export const asyncActionCreator = asyncFactory<RootState>(actionCreator);
