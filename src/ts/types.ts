import React from 'react';
export interface ContactProps {
  contact: {
    id: string;
    name: string;
    number: string;
  };
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

export interface UserData {
  email: string;
  password: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export type Props = {
  children: React.ReactNode;
};
export interface RouteProps {
  component: React.ReactNode;
  redirectTo: string;
}
