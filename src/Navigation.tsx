import { AiOutlinePlus } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { NewTrip } from './NewTrip';
import { TripContext } from './TripContext';
import { WorkTrips } from './WorkTrips';
import { authAxios } from './configAPI';
import { theme } from './theme';
import { useContext, useEffect, useState } from 'react';
import logo from './images/cleevio_logo.png';
import styled from 'styled-components';

export const Navigation = () => {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  const { addTrips, addCountries, setTripErrorAPI, setCountryErrorAPI, setLoadingAPI } =
    useContext(TripContext);

  // Fetch data
  useEffect(() => {
    const fetchTripData = async () => {
      setLoadingAPI(true);
      try {
        const response = await authAxios.get('trip');
        const fetchedTrips = response.data;
        addTrips(fetchedTrips);
      } catch (err) {
        setTripErrorAPI(err);
      }
      setLoadingAPI(false);
    };

    const fetchCountryData = async () => {
      try {
        const response = await authAxios.get('country');
        const fetchedCountries = response.data;
        addCountries(fetchedCountries);
      } catch (err) {
        setCountryErrorAPI(err);
      }
    };

    fetchTripData();
    fetchCountryData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size > 750 && mobileNavbar) setMobileNavbar(false);
  }, [size, mobileNavbar]);

  const handleNavButton = () => {
    setMobileNavbar(prev => !prev);
  };

  return (
    <DivContainer>
      <Router>
        <ButtonBurger onClick={handleNavButton}>
          <FaBarStyled />
        </ButtonBurger>
        <NavStyled
          style={{
            top: mobileNavbar ? '0' : !mobileNavbar && size > 750 ? '0' : '-100vh',
          }}
        >
          <LinkBrand href='#'>
            <img src={logo} alt='logo' />
          </LinkBrand>

          <UlNavigation>
            <Li>
              <LinkNewTrip to='/new-trip' onClick={handleNavButton}>
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

        <DivContent style={{ display: mobileNavbar ? 'none' : 'block' }}>
          <Switch>
            <Route path='/new-trip'>
              <NewTrip />
            </Route>
            <Route path='/'>
              <WorkTrips />
            </Route>
          </Switch>
        </DivContent>
      </Router>
    </DivContainer>
  );
};

const DivContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
});

const DivContent = styled.div({
  marginLeft: '240px',
  width: '100%',
  zIndex: 20,
  '@media all and (max-width: 1000px)': {
    marginLeft: '200px',
  },
  '@media all and (max-width: 750px)': {
    margin: 0,
  },
});

const ButtonBurger = styled.button({
  display: 'none',
  backgroundColor: theme.primaryGrey,
  border: 'none',
  borderRadius: '10px',
  width: '40px',
  height: '40px',
  padding: '14px',
  '@media all and (max-width: 750px)': {
    position: 'absolute',
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

const NavStyled = styled.nav({
  position: 'fixed',
  left: 0,
  top: 0,
  height: '100%',
  maxWidth: '240px',
  width: '100%',
  backgroundColor: `${theme.primaryGrey}`,
  transition: 'all 0.3s ease',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '38px',
  zIndex: 10,
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
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '40px',
});

const SpanTextButton = styled.span({
  paddingLeft: '10px',
});
