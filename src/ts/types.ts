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
