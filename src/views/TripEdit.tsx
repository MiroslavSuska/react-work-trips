import { MobileTripsSidebar } from '../components/MobileTripsSidebar';
import { TripContext } from '../context/TripContext';
import { TripForm } from '../components/TripForm';
import { authAxios } from '../API-config/configAPI';
import { editTrip } from '../features/trips/tripSlice';
import { theme } from '../styles/theme';
import { useAppDispatch } from '../app/hooks';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
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

type TripRouteParams = {
  tripID: string;
};

export const TripEdit = () => {
  const { setFlashMessage } = useContext(TripContext);
  const { tripID } = useParams<TripRouteParams>();
  const dispatch = useAppDispatch();

  // create edit post request
  const handleEditTrip = async (updatedTrip: any) => {
    try {
      const response = await authAxios.put(`/trip/${tripID}`, updatedTrip);
      const data = response.data;
      //console.log(data);

      dispatch(editTrip({ updatedTrip, tripID }));

      setFlashMessage({ display: true, type: 'success', text: 'Trip was successfully updated' });
    } catch (err) {
      setFlashMessage({
        display: true,
        type: 'error',
        text: 'Something went wrong, trip was not updated',
      });
      console.error(err);
    }
  };

  return (
    <DivOuterContainer>
      <DivInnerContainer>
        <H1>Edit trip</H1>

        <DivFormContainer>
          <TripForm tripEditing handleTrip={handleEditTrip} apiTripError={''} />
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
