//import { DivBody } from './styles/GlobalStyle';
import { Link, Route, Switch } from 'react-router-dom';
import { Navigation } from './router/Navigation';
import { NewTrip } from './views/NewTrip';
import { TheTripDetail } from './views/TheTripDetail';
import { TripContextProvider } from './context/TripContext';
import { WorkTrips } from './views/WorkTrips';
import { theme } from './styles/theme';
import styled from 'styled-components';

export default function App() {
  return (
    <TripContextProvider>
      <DivApp>
        <DivNavbar>
          <Navigation />
        </DivNavbar>

        <DivMain>
          <Switch>
            <Route exact path='/new-trip'>
              <NewTrip />
            </Route>
            <Route exact path={`/trip/:tripID`}>
              <TheTripDetail />
            </Route>
            <Route exact path='/'>
              <WorkTrips />
            </Route>
          </Switch>
        </DivMain>
      </DivApp>
    </TripContextProvider>
  );
}

export const DivMain = styled.div({
  flex: '0.87 1',
  //marginLeft: '240px',
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
  //display: 'flex',
  flex: '0.13 1',
  flexDirection: 'row',
  position: 'relative',
});

export const DivApp = styled.div({
  display: 'flex',
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
