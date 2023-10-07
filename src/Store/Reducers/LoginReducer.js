import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  token: null,
  deviceBaseUrl: null,
  BASE_URL: null,
  userDetails: null,
  userDeviceDetails: null,
  loader: null,
};

const { reducer, actions } = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleStoreUserData: (state, action) => {
      state.userData = action.payload;
    },
    handleStoreToken: (state, action) => {
      state.token = action.payload;
    },
    handleStoreDeviceBaseUrl: (state, action) => {
      state.BASE_URL = action.payload;
    },
    handleStoreUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    handleSetLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const {
  handleStoreUserData,
  handleStoreToken,
  handleStoreDeviceBaseUrl,
  handleStoreUserDetails,
  handleSetLoader,
} = actions;

export default reducer;
