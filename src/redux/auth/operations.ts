import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, NewUser, UserData } from './authTypes';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk<
  AuthState,
  NewUser,
  {
    rejectValue: string;
  }
>('auth/register', async (newUser, thunkAPI) => {
  try {
    const res = await axios.post('users/signup', newUser);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk<
  AuthState,
  UserData,
  {
    rejectValue: string;
  }
>('auth/login', async (userData, thunkAPI) => {
  try {
    const res = await axios.post('users/login', userData);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>('auth/logout', async (_, thunkAPI) => {
  try {
    const res = await axios.post('users/logout');
    clearAuthHeader();
    return res.data;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk<
  AuthState['user'],
  void,
  {
    state: { auth: AuthState };
    rejectValue: string;
  }
>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const token = reduxState.auth.token;

    if (token) {
      setAuthHeader(token);
      const res = await axios.get('users/current');
      return res.data;
    } else {
      return thunkAPI.rejectWithValue('No token available');
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
