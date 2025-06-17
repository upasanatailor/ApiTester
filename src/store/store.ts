import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
