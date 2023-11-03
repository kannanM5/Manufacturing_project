import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const { reducer, actions } = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleStoreUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { handleStoreUserData } = actions;

export default reducer;
