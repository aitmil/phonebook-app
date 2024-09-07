import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
import { AuthState } from './authTypes';

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
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
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoading = false;
          state.isLoggedIn = true;
        }
      )
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action: PayloadAction<AuthState>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, handleRejected)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<AuthState['user']>) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.isRefreshing = false;
        }
      )
      .addCase(refreshUser.rejected, handleRejected),
});

export const authReducer = authSlice.reducer;
