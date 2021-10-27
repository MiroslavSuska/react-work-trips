import { ControlButtons } from '../components/ControlButtons';
import { ErrorAPI } from '../components/ErrorAPI';
import { Loading } from '../components/Loading';
import { TheTrip } from '../components/TheTrip';
import { TheTripMobile } from '../components/TheTripMobile';
import { TipAndTrickSidebar } from '../components/TipAndTrickSidebar';
import { TripContext } from '../context/TripContext';
import { theme } from '../styles/theme';
import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

type tripType = {
  id: string | undefined;
  startDate: string;
  endDate: string;
  company: string;
  address: {
    street: undefined | string;
    street_num: undefined | string;
    city: undefined | string;
    country: string;
    zip: string;
  };
  covid: boolean;
  covidDate: undefined | string;
};

type TripRouteParams = {
  trip: string;
  id: string;
};

export const TheTripDetail = () => {
  const { trips } = useContext(TripContext);
  const { id } = useParams<TripRouteParams>();
  const trip = trips.find(trip => trip.id === id);

  const editTrip = () => {};

  const deleteTrip = () => {};

  return (
    <DivContainer>
      <DivTrip>
        <H1>Trip</H1>
        <DivTripDetail>
          <div>{trip?.address.country}</div>
          <div>{trip?.address.city}</div>
          <div>{trip?.address.street}</div>
          <div>{trip?.address.zip}</div>
          <div>{trip?.company_name}</div>
          <div>{trip?.start_date}</div>
          <div>{trip?.end_date}</div>
          <div>{trip?.covid}</div>
          <div>{trip?.covid_test_date}</div>
        </DivTripDetail>
        <ControlButtons delete={deleteTrip} edit={editTrip} />
      </DivTrip>

      <TipAndTrickSidebar />
    </DivContainer>
  );
};

const DivContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  '@media all and (max-width: 1000px)': {
    flexDirection: 'column',
  },
});

const DivTrip = styled.div({
  width: '75%',
  padding: '38px',
  '@media all and (max-width: 1000px)': {
    width: '100%',
  },
  '@media all and (max-width: 800px)': {
    padding: '20px',
  },
  '@media all and (max-width: 750px)': {
    paddingTop: '30px',
  },
});

const DivTripDetail = styled.div({
  textAlign: 'left',
  borderBottom: `1px solid ${theme.borderColor}`,
  paddingBottom: '25px',
});

const H1 = styled.h1({
  borderBottom: `1px solid ${theme.borderColor}`,
  paddingBottom: '24px',
  textAlign: 'left',
});

const UlBigScreen = styled.ul({
  padding: 0,
  '@media all and (max-width: 750px)': {
    display: 'none',
  },
});

const Li = styled.li({
  listStyleType: 'none',
  marginBottom: '20px',
});

const UlMobileScreen = styled.ul({
  padding: 0,
  display: 'none',
  '@media all and (max-width: 750px)': {
    display: 'block',
  },
});
