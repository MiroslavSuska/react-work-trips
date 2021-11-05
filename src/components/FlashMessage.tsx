import { TripContext } from '../context/TripContext';
import { theme } from '../styles/theme';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

export const FlashMessage = () => {
  const { setFlashDisplay, flashMessage, flashDisplay } = useContext(TripContext);

  useEffect(() => {
    const messageTime = setTimeout(() => {
      setFlashDisplay(false);
    }, 3000);

    return () => {
      clearTimeout(messageTime);
    };
  }, [flashDisplay]);

  if (!flashDisplay) {
    return null;
  }

  return <DivFlashMessage> {flashMessage} </DivFlashMessage>;
};

const DivFlashMessage = styled.div({
  padding: '20px',
  backgroundColor: theme.successColor,
  color: theme.primaryWhite,
  fontWeight: 'bold',
  position: 'fixed',
  bottom: '60px',
  right: '60px',
  zIndex: 9999,
});
