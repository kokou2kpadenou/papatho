import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import rootReducer from "../reducers";
import socketMiddleware from "../middleware/socketMiddleware";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["connected"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(socketMiddleware(), thunk)
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
