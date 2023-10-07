import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer";

export const RootReducer = combineReducers({
  login: LoginReducer,
});
