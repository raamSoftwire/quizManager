import { ResetStore } from "../actions";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export function reducerBuilder<T>(initialState: T) {
  return reducerWithInitialState(initialState).case(
    ResetStore,
    () => initialState
  );
}
