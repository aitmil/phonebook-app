import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from './contactsTypes';

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<Contact[]>('/contacts');
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk<
  Contact,
  Omit<Contact, 'id'>,
  { rejectValue: string }
>('contacts/addContact', async (newContact, thunkAPI) => {
  try {
    const response = await axios.post<Contact>('/contacts', newContact);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>('contacts/deleteContact', async (contactId, thunkAPI) => {
  try {
    const response = await axios.delete<Contact>(`/contacts/${contactId}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editContact = createAsyncThunk<
  Contact,
  Partial<Contact> & { id: string },
  { rejectValue: string }
>('contacts/editContact', async ({ id, name, number }, thunkAPI) => {
  try {
    const response = await axios.patch<Contact>(`/contacts/${id}`, {
      name,
      number,
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
