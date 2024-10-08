import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filter/selectors";
import { RootState } from "../store";
import { Contact } from "../../ts/types";

export const selectContacts = (state: RootState): Contact[] =>
  state.contacts.data;

export const selectLoading = (state: RootState): boolean =>
  state.contacts.loading;

export const selectError = (state: RootState): string | null =>
  state.contacts.error;

export const selectContactById = (
  state: RootState,
  contactId: string
): Contact | undefined => {
  return state.contacts.data.find((contact) => contact.id === contactId);
};

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    console.log(contacts);
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);
