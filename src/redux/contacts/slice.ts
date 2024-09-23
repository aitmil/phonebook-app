import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";
import { logOut } from "../auth/operations";
import { ContactsState, Contact } from "../../ts/types";

const initialState: ContactsState = {
  data: [],
  loading: false,
  error: null,
};

const handlePending = (state: ContactsState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (
  state: ContactsState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload || null;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.data.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.data = state.data.filter(
            (item) => item.id !== action.payload.id
          );
          state.loading = false;
        }
      )
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(
        editContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          const index = state.data.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.data[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(editContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.data = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
