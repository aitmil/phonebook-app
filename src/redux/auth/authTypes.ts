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
