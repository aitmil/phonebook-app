import { RootState } from '../store';

export const selectNameFilter = (state: RootState): string =>
  state.filters.name;
