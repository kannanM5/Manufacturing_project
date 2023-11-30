import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  token: null,
};

const { reducer, actions } = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleStoreUserData: (state, action) => {
      state.userData = action.payload;
    },
    handleStoreUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { handleStoreUserData, handleStoreUserToken } = actions;

export default reducer;
