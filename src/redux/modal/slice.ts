import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    editModalIsOpen: false,
    deleteModalIsOpen: false,
    activeContact: null,
  },
  reducers: {
    openEditModal: (state, action) => {
      state.editModalIsOpen = true;
      state.activeContact = action.payload;
    },
    closeEditModal: state => {
      state.editModalIsOpen = false;
      state.activeContact = null;
    },
    openDeleteModal: (state, action) => {
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
