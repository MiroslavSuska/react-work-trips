import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

type tripType = {
  id: undefined | string;
  start_date: string;
  end_date: string;
  company_name: string;
  address: {
    street: string;
    street_num: undefined | string;
    city: string;
    country: string;
    zip: string;
  };
  covid: boolean;
  covid_test_date: undefined | string;
};

type tripState = tripType[];
type editData = {
  tripID: string;
  updatedTrip: tripType;
};

const initialState: tripState = [];

export const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    addTrips: (state, action: PayloadAction<tripState>) => {
      return [...state, ...action.payload];
    },
    removeTrip: (state, action: PayloadAction<string>) => {
      return state.filter(trip => trip.id !== action.payload);
    },
    addTrip: (state, action: PayloadAction<tripType>) => {
      return [...state, action.payload];
    },
    editTrip: (state, action: PayloadAction<editData>) => {
      const { company_name, start_date, end_date, address, covid, covid_test_date } =
        action.payload.updatedTrip;
      let findTrip = state.find(trip => trip.id === action.payload.tripID);

      if (findTrip) {
        findTrip.company_name = company_name;
        findTrip.address = address;
        findTrip.start_date = start_date;
        findTrip.end_date = end_date;
        findTrip.covid = covid;
        findTrip.covid_test_date = covid_test_date;
      }
    },
  },
});

export const { addTrips, removeTrip, addTrip, editTrip } = tripSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTrips = (state: RootState) => state.countries;

export const tripReducer = tripSlice.reducer;
