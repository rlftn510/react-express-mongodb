import { createStore, applyMiddleware } from "redux";

import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from ".";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(
    Reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
