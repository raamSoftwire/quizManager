import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";
import { initialState } from "./state";
import { browserHistory } from "./browserHistory";
import thunkMiddleware from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [routerMiddleware(browserHistory), thunkMiddleware];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(persistedReducer, initialState, enhancers);
export const persistor = persistStore(store);
