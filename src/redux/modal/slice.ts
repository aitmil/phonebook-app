import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../ts/types';

interface ModalTypes {
  editModalIsOpen: boolean;
  deleteModalIsOpen: boolean;
  activeContact: null | Contact;
}

const initialState: ModalTypes = {
  editModalIsOpen: false,
  deleteModalIsOpen: false,
  activeContact: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openEditModal: (state, action: PayloadAction<Contact>) => {
      state.editModalIsOpen = true;
      state.activeContact = action.payload;
    },
    closeEditModal: state => {
      state.editModalIsOpen = false;
      state.activeContact = null;
    },
    openDeleteModal: (state, action: PayloadAction<Contact>) => {
      state.deleteModalIsOpen = true;
      state.activeContact = action.payload;
    },
    closeDeleteModal: state => {
      state.deleteModalIsOpen = false;
      state.activeContact = null;
    },
  },
});

export const {
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
