import { MobileTripsSidebar } from '../components/MobileTripsSidebar';
import { TripContext } from '../context/TripContext';
import { TripForm } from '../components/TripForm';
import { addTrip } from '../features/trips/tripSlice';
import { authAxios } from '../API-config/configAPI';
import { theme } from '../styles/theme';
import { useAppDispatch } from '../app/hooks';
import { useContext } from 'react';
import styled from 'styled-components';

type tripType = {
  id: undefined | string;
  start_date: string;
  end_date: string;
  company_name: string;
  address: {
    street: string;
    street_num: undefined | string;
    city: string;
    country: string;
    zip: string;
  };
  covid: boolean;
  covid_test_date: undefined | string;
};

export const TripCreate = () => {
  const { setFlashMessage } = useContext(TripContext);
  const dispatch = useAppDispatch();

  // create axios post request
  const handleCreateTrip = async (newTrip: tripType) => {
    try {
      const response = await authAxios.post('/trip', newTrip);
      const data = response.data;
      //console.log(data.id);
      newTrip.id = data.id;

      dispatch(addTrip(newTrip));
      //console.log(newTrip);

      setFlashMessage({ display: true, type: 'success', text: 'Trip was successfully updated' });
    } catch (err) {
      setFlashMessage({
        display: true,
        type: 'error',
        text: 'Something went wrong, trip was not added',
      });
      //console.error(err);
    }
  };

  return (
    <DivOuterContainer>
      <DivInnerContainer>
        <H1>New trip</H1>

        <DivFormContainer>
          <TripForm handleTrip={handleCreateTrip} />
        </DivFormContainer>
      </DivInnerContainer>

      <MobileTripsSidebar />
    </DivOuterContainer>
  );
};

const DivOuterContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  '@media all and (max-width: 1000px)': {
    flexDirection: 'column',
  },
});

const DivInnerContainer = styled.div({
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

const DivFormContainer = styled.div({
  maxWidth: '500px',
  margin: 'auto',
  '@media all and (max-width: 750px)': {
    maxWidth: '100%',
  },
});

const H1 = styled.h1({
  borderBottom: `1px solid ${theme.borderColor}`,
  paddingBottom: '24px',
  textAlign: 'left',
});
