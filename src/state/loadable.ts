export interface LoadableState<T> {
  isLoading: boolean;
  data: { [uid: string]: T };
}

export interface SingleLoadableState<T> {
  isLoading: boolean;
  data?: T;
}
