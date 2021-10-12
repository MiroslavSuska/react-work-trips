import { ErrorAPI } from './ErrorAPI';
import { Loading } from './Loading';
import { TheTrip } from './TheTrip';
import { TheTripMobile } from './TheTripMobile';
import { TipAndTrickSidebar } from './TipAndTrickSidebar';
import { TripContext, TripContextProvider } from './TripContext';
import { theme } from './theme';
import { useContext } from 'react';
import styled from 'styled-components';

export const WorkTrips = () => {
  const { trips, tripErrorAPI, loadingAPI } = useContext(TripContext);

  return (
    <DivContainer>
      <DivTrips>
        <H1>Your trips</H1>
        <div>
          {tripErrorAPI && <ErrorAPI errorText={tripErrorAPI} />}
          {loadingAPI && <Loading />}
          <UlBigScreen>
            {trips.length > 0 ? (
              trips.map((trip, index) => (
                <Li key={index}>
                  <TheTrip
                    company={trip.company_name}
                    startDate={trip.start_date}
                    endDate={trip.end_date}
                    address={trip.address}
                    covid={trip.covid}
                    covidDate={trip.covid_test_date}
                  />
                </Li>
              ))
            ) : (
              <h2>No trips yet</h2>
            )}
          </UlBigScreen>

          <UlMobileScreen>
            {trips.length > 0 ? (
              trips.map((trip, index) => (
                <Li key={index}>
                  <TheTripMobile
                    company={trip.company_name}
                    startDate={trip.start_date}
                    endDate={trip.end_date}
                    address={trip.address}
                    covid={trip.covid}
                    covidDate={trip.covid_test_date}
                  />
                </Li>
              ))
            ) : (
              <h2>No trips yet</h2>
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