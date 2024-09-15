import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  name: string;
}

const initialState: FilterState = {
  name: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export const filtersReducer = filterSlice.reducer;
