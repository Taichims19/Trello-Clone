import { combineReducers, configureStore } from "@reduxjs/toolkit";

import trelloReducer from "./trello/trelloSlice";
import authReducer from "./auth/authSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  auth: authReducer,
  trello: trelloReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
