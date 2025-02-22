import { createSlice } from "@reduxjs/toolkit";

import { UserApi } from "../app/services/userApi.ts";

import { User } from "@/app/types.ts";
import { RootState } from "@/app/store.ts";

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(UserApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(UserApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.current = action.payload;
      })
      .addMatcher(
        UserApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        },
      );
  },
});

export const { logout, resetUser } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectCurrent = (state: RootState) => state.user.current;
export const selectUser = (state: RootState) => state.user.user;
