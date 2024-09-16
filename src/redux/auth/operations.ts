import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, NewUser, UserData } from '../../ts/types';

// axios.defaults.baseURL = 'https://phonebook-app-qysw.onrender.com/';

axios.defaults.baseURL = 'http://localhost:3000/';

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
    const res = await axios.post('/auth/register', newUser);
    setAuthHeader(res.data.data.accessToken);
    console.log('API Response:', res.data);
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
  {
    rejectValue: string;
  }
>('auth/login', async (userData, thunkAPI) => {
  try {
    const res = await axios.post('/auth/login', userData);
    setAuthHeader(res.data.data.accessToken);
    return res.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
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
    const res = await axios.post('/auth/logout');
    clearAuthHeader();
    return res.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
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
    const token = reduxState.auth.accessToken;

    if (token) {
      setAuthHeader(token);
      const res = await axios.get('/auth/refresh');
      return res.data.data;
    } else {
      return thunkAPI.rejectWithValue('No token available');
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);
