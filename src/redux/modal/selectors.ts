import { RootState } from '../store';
import { Contact } from '../../ts/types';

export const selectEditModalIsOpen = (state: RootState): boolean =>
  state.modal.editModalIsOpen;

export const selectDeleteModalIsOpen = (state: RootState): boolean =>
  state.modal.deleteModalIsOpen;

export const selectActiveContact = (state: RootState): Contact | null =>
  state.modal.activeContact;
