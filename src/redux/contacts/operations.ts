import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Contact } from "../../ts/types";
import { axiosInstance } from "../auth/operations";

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    console.log(
      `getContacts: ${axiosInstance.defaults.headers.common.Authorization}`
    );
    const response = await axiosInstance.get<{ data: { data: Contact[] } }>(
      "/contacts"
    );
    console.log(response.data.data.data);
    return response.data.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk<
  Contact,
  Omit<Contact, "id">,
  { rejectValue: string }
>("contacts/addContact", async (newContact, thunkAPI) => {
  try {
    const response = await axiosInstance.post<Contact>("/contacts", newContact);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>("contacts/deleteContact", async (contactId, thunkAPI) => {
  try {
    const response = await axiosInstance.delete<Contact>(
      `/contacts/${contactId}`
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editContact = createAsyncThunk<
  Contact,
  Partial<Contact> & { id: string },
  { rejectValue: string }
>("contacts/editContact", async ({ id, name, number }, thunkAPI) => {
  try {
    console.log(`id ${id}`);
    const response = await axiosInstance.patch<Contact>(`/contacts/${id}`, {
      name,
      number,
    });

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
