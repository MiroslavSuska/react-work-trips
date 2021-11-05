import { theme } from '../styles/theme';
import flagAustria from '../images/flag_austria.png';
import flagChina from '../images/flag_china.png';
import flagFrance from '../images/flag_france.png';
import flagGb from '../images/flag_gb.png';
import flagGreece from '../images/flag_greece.png';
import flagItaly from '../images/flag_italy.png';
import flagNetherlands from '../images/flag_netherlands.png';
import flagPlaceholder from '../images/flag_placeholder.png';
import flagPortugal from '../images/flag_portugal.png';
import flagSlovakia from '../images/flag_slovakia.png';
import flagSpain from '../images/flag_spain.png';
import flagSweden from '../images/flag_sweden.png';
import styled from 'styled-components';

type Props = {
  image: string | undefined;
  imageSize: string;
};

export const TheFlag = (props: Props) => {
  return (
    <ImgFlag
      src={
        props.image === 'Slovakia'
          ? flagSlovakia
          : props.image === 'Austria'
          ? flagAustria
          : props.image === 'Italy'
          ? flagItaly
          : props.image === 'Spain'
          ? flagSpain
          : props.image === 'United Kingdom'
          ? flagGb
          : props.image === 'Portugal'
          ? flagPortugal
          : props.image === 'France'
          ? flagFrance
          : props.image === 'China'
          ? flagChina
          : props.image === 'Greece'
          ? flagGreece
          : props.image === 'Sweden'
          ? flagSweden
          : props.image === 'Netherlands'
          ? flagNetherlands
          : flagPlaceholder
      }
      alt='flag'
      style={{
        width: props.imageSize === '40' ? '40px' : '20px',
        height: props.imageSize === '40' ? '40px' : '20px',
      }}
    />
  );
};

const ImgFlag = styled.img({
  border: `2px solid ${theme.borderColor}`,
  borderRadius: '50%',
  marginRight: '20px',
});
