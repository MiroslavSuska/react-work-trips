import { ReactNode, createContext, useState } from 'react';

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

type countryType = {
  value: string;
  label: string;
};

type flashMessageType = {
  display: boolean;
  type: 'success' | 'error';
  text: string;
};

type ContextProps = {
  trips: tripType[];
  countries: countryType[];
  tripErrorAPI: any;
  countryErrorAPI: any;
  loadingAPI: boolean;
  flashMessage: flashMessageType;
  flashDisplay: boolean;
  addTrips: (fetchedTrips: tripType[] | tripType) => void;
  deleteTrip: (tripID: string) => void;
  addCountries: (fetchedCountries: countryType[]) => void;
  setTripErrorAPI: React.Dispatch<any>;
  setCountryErrorAPI: React.Dispatch<any>;
  setLoadingAPI: React.Dispatch<boolean>;
  setFlashMessage: React.Dispatch<flashMessageType>;
  setFlashDisplay: React.Dispatch<boolean>;
};

export const TripContext = createContext<ContextProps>({} as ContextProps);

export const TripContextProvider = (props: { children: ReactNode }) => {
  const [trips, setTrips] = useState([] as tripType[]);
  const [countries, setCountries] = useState([] as countryType[]);
  const [tripErrorAPI, setTripErrorAPI] = useState(null as any | string);
  const [countryErrorAPI, setCountryErrorAPI] = useState(null as any | string);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const [flashMessage, setFlashMessage] = useState<flashMessageType>({
    display: false,
    type: 'success',
    text: '',
  });
  const [flashDisplay, setFlashDisplay] = useState(false);

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

  // delete trip from context
  const deleteTrip = (tripID: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripID));
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
    flashDisplay,
    flashMessage,
    setFlashMessage,
    setFlashDisplay,
    addTrips,
    deleteTrip,
    addCountries,
    setTripErrorAPI,
    setCountryErrorAPI,
    setLoadingAPI,
  };

  return <TripContext.Provider value={values}>{props.children}</TripContext.Provider>;
};
