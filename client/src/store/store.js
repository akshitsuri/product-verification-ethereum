import rootReducer from "./index";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import setAuthToken from "../utils/setAuthToken";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== "production",
});

let currentState = store.getState();

store.subscribe(async () => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    await setAuthToken(token);
  }
});

export default store;
