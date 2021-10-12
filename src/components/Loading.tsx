import { theme } from './theme';
import styled from 'styled-components';

export const Loading = () => {
  return <DivLoading> Fetching data ... </DivLoading>;
};

const DivLoading = styled.div({
  marginBottom: '20px',
  color: theme.secondaryBlack,
  fontWeight: 'bold',
});
