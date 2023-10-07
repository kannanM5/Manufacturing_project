import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "../Reducers";

export const store = configureStore({
  reducer: RootReducer,
});
