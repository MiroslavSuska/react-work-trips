import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

type tripType = {
  id: undefined | string;
  start_date: string;
  end_date: string;
  company_name: string;
  address: {
    street: undefined | string;
    street_num: undefined | string;
    city: undefined | string;
    country: string;
    zip: string;
  };
  covid: boolean;
  covid_test_date: undefined | string;
};

type tripState = tripType[];

const initialState: tripState = [];

export const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    addTripss: (state, action: PayloadAction<tripState>) => {
      return [...state, ...action.payload];
    },
    removeTrip: (state, action: PayloadAction<string>) => {
      return state.filter(trip => trip.id !== action.payload);
    },
    addTripp: (state, action: PayloadAction<tripType>) => {
      return [...state, action.payload];
    },
  },
});

export const { addTripss, removeTrip, addTripp } = tripSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTrips = (state: RootState) => state.countries;

export const tripReducer = tripSlice.reducer;
