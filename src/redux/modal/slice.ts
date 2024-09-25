import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../ts/types";

interface ModalTypes {
  editModalIsOpen: boolean;
  deleteModalIsOpen: boolean;
  addModalIsOpen: boolean;
  activeContact: null | Contact;
}

const initialState: ModalTypes = {
  editModalIsOpen: false,
  deleteModalIsOpen: false,
  addModalIsOpen: false,
  activeContact: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEditModal: (state, action: PayloadAction<Contact>) => {
      state.editModalIsOpen = true;
      state.activeContact = action.payload;
    },
    closeEditModal: (state) => {
      state.editModalIsOpen = false;
      state.activeContact = null;
    },
    openDeleteModal: (state, action: PayloadAction<Contact>) => {
      state.deleteModalIsOpen = true;
      state.activeContact = action.payload;
    },
    closeDeleteModal: (state) => {
      state.deleteModalIsOpen = false;
      state.activeContact = null;
    },
    openAddModal: (state) => {
      state.addModalIsOpen = true;
    },
    closeAddModal: (state) => {
      state.addModalIsOpen = false;
    },
  },
});

export const {
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
  openAddModal,
  closeAddModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
