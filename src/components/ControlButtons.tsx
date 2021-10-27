import { theme } from '../styles/theme';
import styled from 'styled-components';

type Props = {
  delete: () => void;
  edit: () => void;
};

export const ControlButtons = (props: Props) => {
  return (
    <DivButtons>
      <button onClick={props.edit}>Edit</button>
      <button onClick={props.delete}>Delete</button>
    </DivButtons>
  );
};

const DivButtons = styled.div({
  paddingTop: '25px',
});
