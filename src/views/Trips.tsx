import '../styles/animations.css';
import { ErrorAPI } from '../components/ErrorAPI';
import { Loading } from '../components/Loading';
import { TheTrip } from '../components/TheTrip';
import { TheTripMobile } from '../components/TheTripMobile';
import { TipAndTrickSidebar } from '../components/TipAndTrickSidebar';
import { TripContext } from '../context/TripContext';
import { theme } from '../styles/theme';
import { useAppSelector } from '../app/hooks';
import { useContext } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import styled from 'styled-components';

export const Trips = () => {
  const { trips, tripErrorAPI, loadingAPI } = useContext(TripContext);
  const tripsRedux = useAppSelector(state => state.trips);

  return (
    <DivContainer>
      <DivTrips>
        <H1>Your trips</H1>
        <div>
          {tripErrorAPI && <ErrorAPI errorText={tripErrorAPI} />}
          {loadingAPI && <Loading />}

          {/* Trips for large screen */}

          {!loadingAPI && tripsRedux.length === 0 ? (
            <h2>No trips yet</h2>
          ) : (
            <TransitionGroup component='ul' className='trip'>
              {tripsRedux.map((trip, index) => (
                <Li key={index}>
                  <TheTrip
                    id={trip.id}
                    company={trip.company_name}
                    startDate={trip.start_date}
                    endDate={trip.end_date}
                    address={trip.address}
                    covid={trip.covid}
                    covidDate={trip.covid_test_date}
                  />
                </Li>
              ))}
            </TransitionGroup>
          )}

          {/* Trips for small screen */}
          <UlMobileScreen>
            {!loadingAPI && tripsRedux.length === 0 ? (
              <h2>No trips yet</h2>
            ) : (
              tripsRedux.map((trip, index) => (
                <Li key={index}>
                  <TheTripMobile
                    id={trip.id}
                    company={trip.company_name}
                    startDate={trip.start_date}
                    endDate={trip.end_date}
                    address={trip.address}
                    covid={trip.covid}
                    covidDate={trip.covid_test_date}
                  />
                </Li>
              ))
            )}
          </UlMobileScreen>
        </div>
      </DivTrips>

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

const DivTrips = styled.div({
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
