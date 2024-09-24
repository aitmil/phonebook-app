import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";
import { AuthState } from "../../ts/types";

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
  },
  accessToken: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const handlePending = (state: AuthState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: AuthState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload || null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.isLoading = false;
          state.isLoggedIn = true;
        }
      )
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action: PayloadAction<AuthState>) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.accessToken = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(
        refreshUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: AuthState["user"];
            accessToken: string;
          }>
        ) => {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.isLoggedIn = true;
          state.isRefreshing = false;
        }
      )
      .addCase(refreshUser.rejected, handleRejected),
});

export const authReducer = authSlice.reducer;
