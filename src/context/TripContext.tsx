import { ReactNode, createContext, useState } from 'react';

type tripType = {
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

type countryType = {
  value: string;
  label: string;
};

type ContextProps = {
  trips: tripType[];
  countries: countryType[];
  tripErrorAPI: any;
  countryErrorAPI: any;
  loadingAPI: boolean;
  addTrips: (fetchedTrips: tripType[] | tripType) => void;
  addCountries: (fetchedCountries: countryType[]) => void;
  setTripErrorAPI: React.Dispatch<any>;
  setCountryErrorAPI: React.Dispatch<any>;
  setLoadingAPI: React.Dispatch<boolean>;
};

export const TripContext = createContext<ContextProps>({} as ContextProps);

export const TripContextProvider = (props: { children: ReactNode }) => {
  const [trips, setTrips] = useState([] as tripType[]);
  const [countries, setCountries] = useState([] as countryType[]);
  const [tripErrorAPI, setTripErrorAPI] = useState(null as any | string);
  const [countryErrorAPI, setCountryErrorAPI] = useState(null as any | string);
  const [loadingAPI, setLoadingAPI] = useState(false);

  // add trips from API on page load, or one trip from form to context
  const addTrips = (fetchedTrips: tripType[] | tripType) => {
    if (Array.isArray(fetchedTrips)) {
      setTrips(prev => {
        return [...prev, ...fetchedTrips];
      });
    } else {
      setTrips(prev => {
        return [...prev, fetchedTrips];
      });
    }
  };

  // add countries from API to context
  const addCountries = (fetchedCountries: countryType[]) => {
    setCountries(prev => {
      return [...prev, ...fetchedCountries];
    });
  };

  const values = {
    trips,
    countries,
    tripErrorAPI,
    countryErrorAPI,
    loadingAPI,
    addTrips,
    addCountries,
    setTripErrorAPI,
    setCountryErrorAPI,
    setLoadingAPI,
  };

  return <TripContext.Provider value={values}>{props.children}</TripContext.Provider>;
};
