import { Link } from 'react-router-dom';
import { TheFlag } from './TheFlag';
import { theme } from '../styles/theme';
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

export const TheTripMobile = (props: tripType) => {
  return (
    <LinkTripContainer to={`trip/${props.id}`}>
      <DivHeader>
        <TheFlag image={props.address.country} imageSize={'20'} />
        <DivCountry>{props.address.country}</DivCountry>
      </DivHeader>
      <DivTripBody>
        <Span>Company</Span>
        <DivCompany>{props.company}</DivCompany>
        <DivAddress>{props.address.street}</DivAddress>
        <Span>Date</Span>
        <DivDate>
          {' '}
          <Moment format='D MMM YYYY'>{props.startDate}</Moment> -{' '}
          <Moment format='D MMM YYYY'>{props.endDate}</Moment>
        </DivDate>
      </DivTripBody>
    </LinkTripContainer>
  );
};

const LinkTripContainer = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.primaryGrey,
  textDecoration: 'none',
  width: '100%',
  padding: '20px',
});

const DivHeader = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '24px',
});

const DivTripBody = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

const DivCountry = styled.div({
  fontWeight: 600,
  fontSize: '16px',
  color: theme.primaryBlack,
});

const DivDate = styled.div({
  fontWeight: 'normal',
  fontSize: '14px',
  color: theme.primaryBlack,
  textAlign: 'left',
});

const DivCompany = styled.div({
  fontWeight: 600,
  fontSize: '14px',
  color: theme.darkBlue,
});

const DivAddress = styled.div({
  fontWeight: 'normal',
  fontSize: '14px',
  color: theme.darkBlue,
  textAlign: 'left',
  marginBottom: '22px',
});

const Span = styled.span({
  fontWeight: 400,
  fontSize: '12px',
  color: theme.tertiaryGrey,
  marginBottom: '4px',
});
