import { TheFlag } from './TheFlag';
import { theme } from './theme';
import Moment from 'react-moment';
import styled from 'styled-components';

type tripType = {
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

export const TheTrip = (props: tripType) => {
  return (
    <DivTripContainer>
      <DivFlag>
        <TheFlag image={props.address.country} imageSize={'40'} />
      </DivFlag>
      <DivTripBody>
        <DivRow style={{ marginBottom: '2px' }}>
          <DivCountry>{props.address.country}</DivCountry>
          <DivDate>
            <Moment format='D MMM YYYY'>{props.startDate}</Moment> -{' '}
            <Moment format='D MMM YYYY'>{props.endDate}</Moment>
          </DivDate>
        </DivRow>
        <DivRow>
          <DivCompany>{props.address.city}</DivCompany>
          <DivAddress>{props.address.street}</DivAddress>
        </DivRow>
      </DivTripBody>
    </DivTripContainer>
  );
};

const DivTripContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.primaryGrey,
  width: '100%',
  padding: '20px',
});

const DivFlag = styled.div({});

const DivTripBody = styled.div({
  flexDirection: 'row',
});

const DivRow = styled.div({
  textAlign: 'left',
  div: {
    display: 'inline-block',
  },
});
const DivCountry = styled.div({
  fontWeight: 600,
  fontSize: '16px',
  paddingRight: '20px',
  borderRight: `2px solid ${theme.borderColor}`,
  color: theme.primaryBlack,
});

const DivDate = styled.div({
  fontWeight: 'normal',
  fontSize: '14px',
  paddingLeft: '20px',
  color: theme.tertiaryGrey,
});

const DivCompany = styled.div({
  fontWeight: 'normal',
  fontSize: '14px',
  paddingRight: '20px',
  borderRight: `2px solid ${theme.borderColor}`,
  color: theme.primaryBlack,
});

const DivAddress = styled.div({
  fontWeight: 'normal',
  fontSize: '14px',
  paddingLeft: '20px',
  color: theme.tertiaryGrey,
});
