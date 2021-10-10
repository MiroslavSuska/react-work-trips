import { theme } from './theme';
import styled from 'styled-components';

type Props = {
  errorText: any;
};

export const ErrorAPI = (props: Props) => {
  return <DivError>{props.errorText}</DivError>;
};

const DivError = styled.div({
  margin: '20px auto',
  color: theme.errorColor,
  fontWeight: 'bold',
});
