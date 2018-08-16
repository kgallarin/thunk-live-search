import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import ReduxPromise from "redux-promise";
import rootReducer from "./reducers";

export default () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger, thunk, ReduxPromise)
  );
};
