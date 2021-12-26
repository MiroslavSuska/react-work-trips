import { Link } from 'react-router-dom';
import { TripContext } from '../context/TripContext';
import { authAxios } from '../API-config/configAPI';
import { removeTrip } from '../features/trips/tripSlice';
import { theme } from '../styles/theme';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

type Props = {
  tripID: string;
};

export const ControlButtons = (props: Props) => {
  const { setFlashMessage } = useContext(TripContext);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const countriesRedux = useAppSelector(state => state.countries);

  const handleDeleteTrip = async () => {
    if (window.confirm('Are you sure ?')) {
      try {
        const response = await authAxios.delete(`/trip/${props.tripID}`);
        const data = response.data;

        dispatch(removeTrip(props.tripID));
        setFlashMessage({ display: true, type: 'success', text: 'Trip was successfully deleted' });
        history.push('/');
      } catch (err) {
        setFlashMessage({
          display: true,
          type: 'error',
          text: 'Something went wrong, trip was not deleted',
        });
        history.push('/');
        //console.log(err);
      }
    }
  };

  return (
    <DivButtons>
      <ButtonEdit to={`/trips/edit/${props.tripID}`}>Edit</ButtonEdit>
      <ButtonDelete onClick={handleDeleteTrip}>Delete</ButtonDelete>
    </DivButtons>
  );
};

const DivButtons = styled.div({
  paddingTop: '25px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const ButtonEdit = styled(Link)({
  color: theme.secondaryBlack,
  backgroundColor: theme.buttonColor,
  width: '150px',
  borderRadius: '10px',
  border: 'none',
  padding: '15px 20px',
  margin: '20px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'none',
  ':hover': {
    color: theme.secondaryBlack,
    backgroundColor: theme.buttonHoverColor,
    transition: 'all 0.3s ease',
  },
  '@media all and (max-width:500px)': {
    width: '100%',
  },
});

const ButtonDelete = styled.button({
  color: theme.secondaryBlack,
  backgroundColor: theme.buttonRedColor,
  width: '150px',
  borderRadius: '10px',
  border: 'none',
  padding: '15px 20px',
  margin: '20px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  ':hover': {
    color: theme.secondaryBlack,
    backgroundColor: theme.errorColor,
    transition: 'all 0.3s ease',
  },
  '@media all and (max-width:500px)': {
    width: '100%',
  },
});
