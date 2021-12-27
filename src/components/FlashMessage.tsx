import { TripContext } from '../context/TripContext';
import { theme } from '../styles/theme';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

export const FlashMessage = () => {
  const { setFlashMessage, flashMessage } = useContext(TripContext);

  useEffect(() => {
    const messageTime = setTimeout(() => {
      setFlashMessage({ display: false, type: flashMessage.type, text: flashMessage.text });
    }, 3500);

    return () => {
      clearTimeout(messageTime);
    };
  }, [flashMessage.display]);

  if (!flashMessage.display) {
    return null;
  }

  return (
    <DivFlashMessage
      style={{
        backgroundColor: flashMessage.type === 'success' ? theme.successColor : theme.errorColor,
      }}
    >
      {' '}
      {flashMessage.text}{' '}
    </DivFlashMessage>
  );
};

const DivFlashMessage = styled.div({
  padding: '20px',
  color: theme.primaryWhite,
  fontWeight: 'bold',
  position: 'fixed',
  bottom: '60px',
  right: '60px',
  zIndex: 9999,
  transition: 'all .4s ease',
  '@media all and (max-width: 750px)': {
    padding: '10px',
    fontWeight: 'normal',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '80%',
    minWidth: '70%',
  },
});
