//import { DivBody } from './styles/GlobalStyle';
import { AxiosError } from 'axios';
import { FlashMessage } from './components/FlashMessage';
import { Navigation } from './router/Navigation';
import { Route, Switch } from 'react-router-dom';
import { TripContext } from './context/TripContext';
import { TripCreate } from './views/TripCreate';
import { TripDetail } from './views/TripDetail';
import { TripEdit } from './views/TripEdit';
import { Trips } from './views/Trips';
import { addCountries } from './features/countries/countrySlice';
import { addTrips } from './features/trips/tripSlice';
import { authAxios } from './API-config/configAPI';
import { handleError } from './helperFunctions/handleError';
import { theme } from './styles/theme';
import { useAppDispatch } from './app/hooks';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

export default function App() {
  const { setLoadingAPI, setFlashMessage, setTripErrorAPI, setCountryErrorAPI } =
    useContext(TripContext);
  const dispatch = useAppDispatch();

  // Fetch data
  useEffect(() => {
    const fetchTripData = async () => {
      setLoadingAPI(true);
      try {
        const response = await authAxios.get('trip');
        const fetchedTrips = await response.data;
        dispatch(addTrips(fetchedTrips));

        setTripErrorAPI('');
      } catch (error) {
        const err = error as AxiosError;
        handleError(err, 'Trip data', setFlashMessage);
        setTripErrorAPI(err.message);
        //console.error(err);
      }
      setLoadingAPI(false);
    };

    const fetchCountryData = async () => {
      try {
        const response = await authAxios.get('country');
        const fetchedCountries = await response.data;
        dispatch(addCountries(fetchedCountries));

        setCountryErrorAPI('');
      } catch (error) {
        const err = error as AxiosError;
        handleError(err, 'Country data', setFlashMessage);
        setCountryErrorAPI(err.message);
        //console.error(err);
      }
    };

    fetchTripData();
    fetchCountryData();
  }, []);

  return (
    <DivApp>
      <DivNavbar>
        <Navigation />
      </DivNavbar>

      <DivMain>
        <Switch>
          <Route exact path='/trips/new/create'>
            <TripCreate />
          </Route>
          <Route exact path='/trips/edit/:tripID'>
            <TripEdit />
          </Route>
          <Route exact path={`/trips/:tripID`}>
            <TripDetail />
          </Route>
          <Route exact path='/'>
            <Trips />
          </Route>
        </Switch>
      </DivMain>

      <FlashMessage />
    </DivApp>
  );
}

export const DivMain = styled.div({
  //flex: '0.87 1',
  position: 'relative',
  marginLeft: '240px',
  width: '100%',
  zIndex: 20,
  '@media all and (max-width: 1000px)': {
    marginLeft: '200px',
  },
  '@media all and (max-width: 750px)': {
    margin: 0,
  },
});

export const DivNavbar = styled.div({
  display: 'flex',
  //flex: '0.13 1',
  //flexDirection: 'row',
});

export const DivApp = styled.div({
  display: 'flex',
  position: 'relative',
  fontFamily: 'Open Sans',
  minHeight: '100vh',
  backgroundColor: theme.primaryWhite,
  color: '#1d1e1f',
  fontSize: '16px',
  margin: 0,
  textAlign: 'center',
  h1: {
    color: theme.primaryBlack,
    fontSize: '24px',
    fontWeight: 'normal',
    marginBottom: '25px',
  },
  h2: {
    color: theme.secondaryBlack,
    marginBottom: '20px',
    fontSize: '18px',
  },
  h5: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: theme.primaryBlack,
    lineHeight: '19px',
    marginBottom: '20px',
  },
  'input[type="date"]::-webkit-datetime-edit-text': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-webkit-datetime-edit-month-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-webkit-datetime-edit-day-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-webkit-datetime-edit-year-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"].date-input--has-value::-webkit-datetime-edit-text': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-webkit-datetime-edit-month-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-webkit-datetime-edit-day-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-webkit-datetime-edit-year-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"]::-moz-datetime-edit-text': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-moz-datetime-edit-month-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-moz-datetime-edit-day-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-moz-datetime-edit-year-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"].date-input--has-value::-moz-datetime-edit-text': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-moz-datetime-edit-month-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-moz-datetime-edit-day-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-moz-datetime-edit-year-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"]::-ms-datetime-edit-text': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-ms-datetime-edit-month-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-ms-datetime-edit-day-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-ms-datetime-edit-year-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"].date-input--has-value::-ms-datetime-edit-text': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-ms-datetime-edit-month-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-ms-datetime-edit-day-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-ms-datetime-edit-year-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"]::-o-datetime-edit-text': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-o-datetime-edit-month-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-o-datetime-edit-day-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"]::-o-datetime-edit-year-field': {
    color: theme.placeholderColor,
  },
  'input[type="date"].date-input--has-value::-o-datetime-edit-text': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-o-datetime-edit-month-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-o-datetime-edit-day-field': {
    color: theme.primaryBlack,
  },
  'input[type="date"].date-input--has-value::-o-datetime-edit-year-field': {
    color: theme.primaryBlack,
  },
  'select::-ms-expand': {
    display: 'none' /* Remove default arrow in Internet Explorer 10 and 11 */,
  },

  ' *, :after, :before': {
    boxSizing: 'border-box',
  },
  '@media all and (max-width: 750px)': {
    h1: {
      fontSize: '14px',
      paddingBottom: '30px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
});
