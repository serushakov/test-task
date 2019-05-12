import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import packageList from "./package-list/package-list";

const reducers = combineReducers({
  packageList
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
