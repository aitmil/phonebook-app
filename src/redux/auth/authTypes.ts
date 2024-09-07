export interface AuthState {
  user: {
    name: null | string;
    email: null | string;
  };
  token: null | string;
  isLoggedIn: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: null | string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  password: string;
}
