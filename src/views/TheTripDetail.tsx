import { ControlButtons } from '../components/ControlButtons';
import { TheFlag } from '../components/TheFlag';
import { TipAndTrickSidebar } from '../components/TipAndTrickSidebar';
import { TripContext } from '../context/TripContext';
import { theme } from '../styles/theme';
import { useContext } from 'react';
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

export const TheTripDetail = () => {
  const { trips } = useContext(TripContext);
  const { tripID } = useParams<TripRouteParams>();
  const trip = trips.find(trip => trip.id === tripID);

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
              <DivCompany>{trip?.company_name}</DivCompany>
            </DivWrap>

            <DivWrap>
              <span>Address</span>

              <DivAddress>{trip?.address.city}</DivAddress>
              <DivAddress>{trip?.address.street}</DivAddress>
              <DivAddress>{trip?.address.street_num}</DivAddress>
              <DivAddress>{trip?.address.zip}</DivAddress>
            </DivWrap>

            <DivWrap>
              <span>Date</span>
              <DivDate>
                {' '}
                <Moment format='D MMM YYYY'>{trip?.start_date}</Moment> -{' '}
                <Moment format='D MMM YYYY'>{trip?.end_date}</Moment>
              </DivDate>
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
const DivDate = styled.div({
  fontWeight: 'normal',
  fontSize: '14px',
  color: theme.primaryBlack,
  textAlign: 'left',
});

const DivCompany = styled.div({
  fontWeight: 'normal',
  fontSize: '16px',
  color: theme.secondaryBlack,
});

const DivAddress = styled.div({
  fontWeight: 'normal',
  fontSize: '14px',
  color: theme.primaryBlack,
  textAlign: 'left',
});

const span = styled.span({
  fontWeight: 400,
  fontSize: '18px',
  color: theme.tertiaryGrey,
  marginBottom: '15px',
});
