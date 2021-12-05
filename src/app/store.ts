import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from '../features/countries/countrySlice';
import { tripReducer } from '../features/trips/tripSlice';

export const store = configureStore({
  reducer: {
    countries: countryReducer,
    trips: tripReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
