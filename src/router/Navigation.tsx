import { AiOutlinePlus } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';
import { useEffect, useState } from 'react';
import logo from '../images/logo.jpg';
import styled from 'styled-components';

export const Navigation = () => {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // handle windowSize on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // close mobile navbar on bigger window size
  useEffect(() => {
    if (windowSize > 750 && mobileNavbar) setMobileNavbar(false);
  }, [windowSize, mobileNavbar]);

  const handleNavButton = () => {
    setMobileNavbar(prev => !prev);
  };

  return (
    <DivNavContainer
      style={{
        top: mobileNavbar ? '0' : !mobileNavbar && windowSize > 750 ? '0' : '-100vh',
      }}
    >
      <ButtonBurger onClick={handleNavButton}>
        <FaBarStyled />
      </ButtonBurger>

      <NavStyled>
        <LinkBrand href='/'>
          <img src={logo} alt='logo' />
        </LinkBrand>

        <UlNavigation>
          <Li>
            <LinkNewTrip to='/trips/new/create' onClick={handleNavButton}>
              New trip <AiOutlinePlus />
            </LinkNewTrip>
          </Li>
          <Li>
            <LinkTrips to='/' onClick={handleNavButton}>
              <BsClock /> <SpanTextButton>Your Trips</SpanTextButton>
            </LinkTrips>
          </Li>
        </UlNavigation>
      </NavStyled>
    </DivNavContainer>
  );
};

const DivNavContainer = styled.div({
  //display: 'fixed',
  //flexDirection: 'row',
  //position: 'relative',
  height: '100%',
  width: '100%',
  backgroundColor: `${theme.primaryGrey}`,
  transition: 'all 0.3s ease',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '38px',
  zIndex: 10,
  position: 'fixed',
  left: 0,
  top: 0,
  maxWidth: '240px',
  //width: '100%',
  '@media all and (max-width: 1000px)': {
    maxWidth: '200px',
    padding: '40px 18px 18px 18px',
  },
  '@media all and (max-width: 800px)': {
    paddingTop: '20px',
  },
  '@media all and (max-width: 750px)': {
    maxWidth: '100%',
    zIndex: 60,
  },
});

const NavStyled = styled.nav({
  width: '100%',
});

const ButtonBurger = styled.button({
  display: 'none',
  backgroundColor: theme.primaryGrey,
  border: `1px solid ${theme.borderColor}`,
  borderRadius: '10px',
  width: '40px',
  height: '40px',
  padding: '14px',
  '@media all and (max-width: 750px)': {
    position: 'fixed',
    top: '20px',
    left: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 100,
  },
});

const FaBarStyled = styled(FaBars)({
  color: theme.tertiaryGrey,
  fontSize: '14px',
});
const Li = styled.li`
  align-items: center;
  justify-content: center;
`;

const UlNavigation = styled.ul({
  justifyContent: 'center',
  alignItems: 'center',
  listStyleType: 'none',
  padding: 0,
  transition: 'all 0.3s ease',
});

const LinkNewTrip = styled(Link)({
  backgroundColor: theme.buttonColor,
  color: theme.secondaryBlack,
  textDecoration: 'none',
  width: '100%',
  borderRadius: '10px',
  border: 'none',
  padding: '15px 20px',
  marginBottom: '30px',
  fontSize: '14px',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  ':hover': {
    color: theme.secondaryBlack,
    backgroundColor: theme.buttonHoverColor,
    transition: 'all 0.3s ease',
  },
});

const LinkTrips = styled(Link)({
  color: theme.secondaryBlack,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textDecoration: 'none',
  textAlign: 'left',
  marginBottom: '30px',
  fontSize: '16px',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  ':hover': {
    color: theme.tertiaryGrey,
    transition: 'all 0.3s ease',
  },
});

const LinkBrand = styled.a({
  display: 'block',
  height: 'auto',
  marginBottom: '40px',
  img: {
    width: '100%',
    maxWidth: '130px',
  },
});

const SpanTextButton = styled.span({
  paddingLeft: '10px',
});
