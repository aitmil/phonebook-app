import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, NewUser, UserData } from "../../ts/types";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", //TODO: change url on: https://phonebook-app-qysw.onrender.com/
  withCredentials: true,
});

const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk<
  AuthState,
  NewUser,
  { rejectValue: string }
>("auth/register", async (newUser, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/register", newUser);
    setAuthHeader(res.data.data.accessToken);
    console.log("API Response:", res.data);
    return res.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const logIn = createAsyncThunk<
  AuthState,
  UserData,
  { rejectValue: string }
>("auth/login", async (userData, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/login", userData);
    setAuthHeader(res.data.data.accessToken);
    return res.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post("/auth/logout");
      clearAuthHeader();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const refreshUser = createAsyncThunk<
  { user: AuthState["user"]; accessToken: string },
  void,
  { state: { auth: AuthState }; rejectValue: string }
>(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    if (token) {
      setAuthHeader(token);
      try {
        const response = await axiosInstance.post("/auth/refresh");
        const { user, accessToken } = response.data.data;
        setAuthHeader(accessToken);
        return { user, accessToken };
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || error.message
        );
      }
    } else {
      return thunkAPI.rejectWithValue("No token available");
    }
  },
  {
    condition(_, { getState }) {
      const state = getState();
      return state.auth.accessToken !== null;
    },
  }
);
