import { ErrorAPI } from '../components/ErrorAPI';
import { FiCheck } from 'react-icons/fi';
import { MobileTripsSidebar } from '../components/MobileTripsSidebar';
import { TripContext } from '../context/TripContext';
import { TripForm } from '../components/TripForm';
import { addTripp } from '../features/trips/tripSlice';
import { authAxios } from '../API-config/configAPI';
import { theme } from '../styles/theme';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import chevronUp from '../images/chevron-up.png';
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
  const { addTrips, countries, countryErrorAPI, setFlashDisplay, setFlashMessage } =
    useContext(TripContext);
  const [apiTripError, setApiTripError] = useState<any>();
  const dispatch = useAppDispatch();

  // create axios post request
  const handleCreateTrip = async (newTrip: tripType) => {
    try {
      const response = await authAxios.post('/trip', newTrip);
      const data = response.data;
      //console.log(data.id);
      newTrip.id = data.id;

      dispatch(addTripp(newTrip));
      console.log(newTrip);

      addTrips(newTrip);
      setFlashDisplay(true);
      setFlashMessage('Trip was successfully added');
    } catch (err) {
      setApiTripError(err);
    }
  };

  return (
    <DivOuterContainer>
      <DivInnerContainer>
        <H1>New trip</H1>

        <DivFormContainer>
          <TripForm handleTrip={handleCreateTrip} apiTripError={apiTripError} />
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
