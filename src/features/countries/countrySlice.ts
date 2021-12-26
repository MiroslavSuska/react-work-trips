import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

type CountryState = {
  label: string;
  value: string;
}[];

const initialState: CountryState = [];

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountries: (state, action: PayloadAction<CountryState>) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addCountries } = countrySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCountries = (state: RootState) => state.countries;

export const countryReducer = countrySlice.reducer;
