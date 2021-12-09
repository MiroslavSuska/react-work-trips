import { ControlButtons } from '../components/ControlButtons';
import { TheFlag } from '../components/TheFlag';
import { TipAndTrickSidebar } from '../components/TipAndTrickSidebar';
import { TripContext } from '../context/TripContext';
import { theme } from '../styles/theme';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';

type tripType = {
  id: undefined | string;
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
  tripID: string;
};

export const TripDetail = () => {
  const { trips } = useContext(TripContext);
  const { tripID } = useParams<TripRouteParams>();
  const trip = trips.find(trip => trip.id === tripID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DivContainer>
      <DivTrip>
        <H1>Trip</H1>
        <DivTripDetail>
          <DivTripHeader>
            <TheFlag image={trip?.address.country} imageSize='40' />
            <DivCountry>{trip?.address.country}</DivCountry>
          </DivTripHeader>

          <DivTripBody>
            <DivWrap>
              <span>Company</span>
              <DivTripInfo>{trip?.company_name}</DivTripInfo>
            </DivWrap>

            <DivWrap>
              <span>City</span>
              <DivTripInfo>{trip?.address.city}</DivTripInfo>
            </DivWrap>

            <DivWrap>
              <span>Address</span>
              <DivTripInfo>{trip?.address.street}</DivTripInfo>
              <DivTripInfo>{trip?.address.street_num}</DivTripInfo>
              <DivTripInfo>{trip?.address.zip}</DivTripInfo>
            </DivWrap>

            <DivWrap>
              <span>Date</span>
              <DivTripInfo>
                {' '}
                <Moment format='D MMM YYYY'>{trip?.start_date}</Moment> -{' '}
                <Moment format='D MMM YYYY'>{trip?.end_date}</Moment>
              </DivTripInfo>
            </DivWrap>
          </DivTripBody>
        </DivTripDetail>
        <ControlButtons tripID={tripID} />
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

const DivTripHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '25px',
});

const DivWrap = styled.div({
  marginBottom: '15px',
  span: {
    display: 'block',
    fontWeight: 400,
    fontSize: '18px',
    color: theme.tertiaryGrey,
    marginBottom: '10px',
  },
});

const DivCountry = styled.div({
  fontWeight: 600,
  fontSize: '24px',
  color: theme.secondaryBlack,
});

const DivTripBody = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

const DivTripInfo = styled.div({
  fontWeight: 'normal',
  fontSize: '14px',
  color: theme.primaryBlack,
  textAlign: 'left',
});
