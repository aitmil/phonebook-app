import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './operations';
import { logOut } from '../auth/operations';
import { ContactsState, Contact } from './contactsTypes';

const initialState: ContactsState = {
  items: [],
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
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.items.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.items = state.items.filter(
            item => item.id !== action.payload.id
          );
          state.loading = false;
        }
      )
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(
        editContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          const index = state.items.findIndex(
            item => item.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(editContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
