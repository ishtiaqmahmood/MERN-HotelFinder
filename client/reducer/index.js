import { combineReducers } from "redux";
import authReducer from "./auth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// combine mutliple reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
