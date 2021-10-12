import { TheTripMobile } from './TheTripMobile';
import { TripContext } from '../context/TripContext';
import { theme } from '../styles/theme';
import { useContext } from 'react';
import styled from 'styled-components';

export const MobileTripsSidebar = () => {
  const { trips } = useContext(TripContext);

  return (
    <DivContainer>
      <h1>Trips</h1>
      <div>
        <Ul>
          {trips.map((trip, index) => (
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
          ))}
        </Ul>
      </div>
    </DivContainer>
  );
};

const DivContainer = styled.div({
  width: '25%',
  borderLeft: `1px solid ${theme.borderColor}`,
  padding: '38px',
  textAlign: 'center',
  '@media all and (max-width: 1200px)': {
    padding: '38px 20px 20px 20px',
  },
  '@media all and (max-width: 1000px)': {
    display: 'none',
  },
});

const Ul = styled.ul({
  padding: 0,
});

const Li = styled.li({
  listStyleType: 'none',
  marginBottom: '20px',
});
