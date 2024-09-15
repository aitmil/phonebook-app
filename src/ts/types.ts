import React from 'react';

export type Props = {
  children: React.ReactNode;
};
export interface RouteProps {
  component: React.ReactNode;
  redirectTo: string;
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
export interface ContactProps {
  contact: {
    id: string;
    name: string;
    number: string;
  };
}

export interface Contact {
  id: string;
  name: string;
  number: string;
}

export interface ContactsState {
  items: Contact[];
  loading: boolean;
  error: null | string;
}

export interface ContactFormValues {
  name: string;
  number: string;
}

export interface EditFormValues {
  id: string;
  name: string;
  number: string;
}
