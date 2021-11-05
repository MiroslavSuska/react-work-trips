import { ErrorAPI } from '../components/ErrorAPI';
import { FiCheck } from 'react-icons/fi';
import { MobileTripsSidebar } from '../components/MobileTripsSidebar';
import { TripContext } from '../context/TripContext';
import { authAxios } from '../API-config/configAPI';
import { theme } from '../styles/theme';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import chevronUp from '../images/chevron-up.png';
import styled from 'styled-components';

type tripType = {
  id: undefined | string;
  start_date: string;
  end_date: string;
  company_name: string;
  address: {
    street: undefined | string;
    street_num: undefined | string;
    city: undefined | string;
    country: string;
    zip: string;
  };
  covid: boolean;
  covid_test_date: undefined | string;
};

type errors = {
  country: boolean;
  startDate: boolean;
  endDate: boolean;
  properDates: boolean;
  company: boolean;
  city: boolean;
  street: boolean;
  zip: boolean;
  covid: boolean;
  covidDate: boolean;
};

export const NewTrip = () => {
  const { addTrips, countries, countryErrorAPI, setFlashDisplay, setFlashMessage } =
    useContext(TripContext);
  const [country, setCountry] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [covidStatus, setCovidStatus] = useState('');
  const [covidDate, setCovidDate] = useState<string>('');
  const [createTripError, setCreateTripError] = useState<any>();
  const [errors, setErrors] = useState<errors>({
    country: false,
    startDate: false,
    endDate: false,
    properDates: false,
    company: false,
    city: false,
    street: false,
    zip: false,
    covid: false,
    covidDate: false,
  });
  const history = useHistory();

  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.currentTarget.value);
  };

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.currentTarget.value);
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.currentTarget.value);
  };

  const handleCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.currentTarget.value);
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const handleStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.currentTarget.value);
  };

  const handleStreetNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetNumber(e.currentTarget.value);
  };

  const handleZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.currentTarget.value);
  };

  const handleCovidStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCovidStatus(e.currentTarget.value);
  };

  const handleCovidDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCovidDate(e.currentTarget.value);
  };

  // check the string state of covid status and return boolean
  const covidData = () => {
    if (covidStatus === 'yes') return true;
    else return false;
  };

  // reset all inputs
  const clearInputs = () => {
    setCountry('');
    setEndDate('');
    setStartDate('');
    setCovidDate('');
    setCovidStatus('');
    setCompany('');
    setCity('');
    setStreet('');
    setStreetNumber('');
    setZipCode('');
  };

  // reset all errors
  const clearErrors = () => {
    // setErrorStartDate(false);
    // setErrorEndDate(false);
    // setErrorCompany(false);
    // setErrorCountry(false);
    // setErrorZip(false);
    // setErrorCovid(false);
    // setErrorProperDate(false);
    setCreateTripError('');
    setErrors({
      country: false,
      startDate: false,
      endDate: false,
      properDates: false,
      company: false,
      city: false,
      street: false,
      zip: false,
      covid: false,
      covidDate: false,
    });
  };

  // check for right inputs and reset errors
  const checkErrors = () => {
    //if (startDate !== '') setErrorStartDate(false);
    //if (endDate !== '') setErrorEndDate(false);
    //if (company !== '') setErrorCompany(false);
    //if (country !== '') setErrorCountry(false);
    //if (zipCode !== '') setErrorZip(false);
    //if (covidStatus !== '') setErrorCovid(false);
    if (dateIsValid()) {
      //setErrorProperDate(false);
      setErrors(prevState => ({
        ...prevState,
        properDates: false,
      }));
    } else
      setErrors(prevState => ({
        ...prevState,
        properDates: true,
      }));
    if (startDate !== '')
      setErrors(prevState => ({
        ...prevState,
        startDate: false,
      }));
    if (endDate !== '')
      setErrors(prevState => ({
        ...prevState,
        endDate: false,
      }));
    if (country !== '')
      setErrors(prevState => ({
        ...prevState,
        country: false,
      }));
    if (company !== '')
      setErrors(prevState => ({
        ...prevState,
        company: false,
      }));
    if (city !== '')
      setErrors(prevState => ({
        ...prevState,
        city: false,
      }));
    if (street !== '')
      setErrors(prevState => ({
        ...prevState,
        street: false,
      }));
    if (zipCode !== '')
      setErrors(prevState => ({
        ...prevState,
        zip: false,
      }));
    if (covidStatus !== '')
      setErrors(prevState => ({
        ...prevState,
        covid: false,
      }));

    if (covidStatus !== '' && covidDate !== '')
      setErrors(prevState => ({
        ...prevState,
        covidDate: false,
      }));
  };

  // validate if start date is before or same as end date
  const dateIsValid = () => {
    const firstDate = startDate;
    const secondDate = endDate;
    if (firstDate <= secondDate) {
      return true;
    } else return false;
  };

  // check covid status and covid date
  const isCovidStatusValid = () => {
    if (!covidStatus) return false;
    else if (covidStatus === 'no') {
      return true;
    } else if (covidStatus === 'yes' && !covidDate) {
      return false;
    } else if (covidStatus === 'yes' && covidDate) {
      return true;
    }
  };

  // set error states
  const setErrorStatuses = () => {
    //if (startDate === '') setErrorStartDate(true);
    if (startDate === '')
      setErrors(prevState => ({
        ...prevState,
        startDate: true,
      }));
    //if (endDate === '') setErrorEndDate(true);
    if (endDate === '')
      setErrors(prevState => ({
        ...prevState,
        endDate: true,
      }));
    if (!dateIsValid())
      setErrors(prevState => ({
        ...prevState,
        properDates: true,
      }));
    //if (company === '') setErrorCompany(true);
    if (company === '')
      setErrors(prevState => ({
        ...prevState,
        company: true,
      }));
    //if (country === '') setErrorCountry(true);
    if (country === '')
      setErrors(prevState => ({
        ...prevState,
        country: true,
      }));
    if (city === '')
      setErrors(prevState => ({
        ...prevState,
        city: true,
      }));
    if (street === '')
      setErrors(prevState => ({
        ...prevState,
        street: true,
      }));
    //if (zipCode === '') setErrorZip(true);
    if (zipCode === '')
      setErrors(prevState => ({
        ...prevState,
        zip: true,
      }));
    //if (covidStatus === '') setErrorCovid(true);
    if (covidStatus === '') {
      setErrors(prevState => ({
        ...prevState,
        covid: true,
      }));
    } else if (covidStatus === 'yes' && covidDate === '') {
      setErrors(prevState => ({
        ...prevState,
        covidDate: true,
      }));
    }
  };

  // validate if inputs are fulfilled and if not, set error
  const validate = () => {
    if (
      startDate &&
      endDate &&
      company &&
      country &&
      city &&
      street &&
      zipCode &&
      isCovidStatusValid() &&
      dateIsValid()
    ) {
      return true;
    }

    setErrorStatuses();
    return false;
  };

  // create axios post request
  const createTrip = async (newTrip: tripType) => {
    try {
      const response = await authAxios.post('/trip', newTrip);
      const data = response.data;
      //console.log(data.id);
      newTrip.id = data.id;
      addTrips(newTrip);
      setFlashDisplay(true);
      setFlashMessage('Trip was successfully added');
    } catch (err) {
      setCreateTripError(err);
    }
  };

  // handle submit button for new trip
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      const newTrip = {
        id: undefined,
        start_date: startDate,
        end_date: endDate,
        company_name: company.trim(),
        address: {
          street: street.trim(),
          street_num: undefined,
          city: city.trim(),
          country: country.trim(),
          zip: zipCode.trim(),
        },
        covid: covidData(),
        covid_test_date: covidDate,
      };

      createTrip(newTrip);
      clearInputs();
      clearErrors();
      history.push('/');
    }
    checkErrors();
  };

  return (
    <DivContainer>
      <DivNewTrip>
        <H1>New trip</H1>

        <DivFormWrap>
          <form onSubmit={handleSubmit}>
            <DivFormBox>
              <h5>Where do you want to go</h5>
              <DivSelectWrapper>
                <Select
                  name='countries'
                  id='country-select'
                  onChange={handleCountry}
                  value={country}
                  style={{
                    borderColor: errors.country ? theme.errorColor : theme.borderColor,
                    color: country ? theme.primaryBlack : theme.placeholderColor,
                  }}
                >
                  <option value=''>Select country</option>
                  {countries.map((country, index) => (
                    <Option value={country.label} key={index}>
                      {country.label}
                    </Option>
                  ))}
                </Select>
              </DivSelectWrapper>
              {countryErrorAPI && <ErrorAPI errorText={countryErrorAPI} />}
              {errors.country && <DivAlert>Please pick a country</DivAlert>}
            </DivFormBox>

            <DivFormBox>
              <h5>Start date</h5>
              <InputText
                type='date'
                placeholder='dd.mm.yy'
                onChange={handleStartDate}
                value={startDate}
                className={startDate ? 'date-input--has-value' : ''}
                style={{
                  borderColor:
                    errors.startDate || errors.properDates ? theme.errorColor : theme.borderColor,
                }}
              />
              {errors.startDate && <DivAlert>Please pick a start date</DivAlert>}

              <h5>End date</h5>
              <InputText
                type='date'
                placeholder='dd.mm.yy'
                onChange={handleEndDate}
                value={endDate}
                className={endDate ? 'date-input--has-value' : ''}
                style={{
                  borderColor:
                    errors.endDate || errors.properDates ? theme.errorColor : theme.borderColor,
                }}
              />
              {errors.endDate && <DivAlert>Please pick the end date</DivAlert>}
              {errors.properDates && (
                <DivAlert>
                  Please make sure you choose start date before or same day as end date
                </DivAlert>
              )}
            </DivFormBox>

            <DivFormBox>
              <h5>Company name</h5>
              <InputText
                type='text'
                placeholder='Type here ...'
                onChange={handleCompany}
                value={company}
                style={{ borderColor: errors.company ? theme.errorColor : theme.borderColor }}
              />
              {errors.company && <DivAlert>Please type a company</DivAlert>}

              <h5>City</h5>
              <InputText
                type='text'
                placeholder='Type here ...'
                onChange={handleCity}
                value={city}
                style={{ borderColor: errors.city ? theme.errorColor : theme.borderColor }}
              />
              {errors.city && <DivAlert>Please type a city</DivAlert>}

              <h5>Street</h5>
              <InputText
                type='text'
                placeholder='Type here ...'
                onChange={handleStreet}
                value={street}
                style={{ borderColor: errors.street ? theme.errorColor : theme.borderColor }}
              />
              {errors.street && <DivAlert>Please type a street</DivAlert>}

              <h5>Street number</h5>
              <InputText
                type='number'
                placeholder='Type here ...'
                onChange={handleStreetNumber}
                value={streetNumber}
              />

              <h5>Zip code</h5>
              <InputText
                type='number'
                placeholder='Type here ...'
                onChange={handleZipCode}
                value={zipCode}
                style={{ borderColor: errors.zip ? theme.errorColor : theme.borderColor }}
              />
              {errors.zip && <DivAlert>Please type a zip code</DivAlert>}
            </DivFormBox>

            <DivFormBox>
              <h5>
                Have you been recently tested for <b>COVID-19?</b>
              </h5>

              <DivRadio>
                <input
                  type='radio'
                  id='covid-yes'
                  name='radio-covid'
                  value='yes'
                  onChange={handleCovidStatus}
                  checked={covidStatus === 'yes'}
                />
                <label htmlFor='covid-yes'>Yes</label>
              </DivRadio>

              <DivRadio>
                <input
                  type='radio'
                  id='covid-no'
                  name='radio-covid'
                  value='no'
                  onChange={handleCovidStatus}
                  checked={covidStatus === 'no'}
                />
                <label htmlFor='covid-no'>No</label>
              </DivRadio>
              {errors.covid && (
                <DivAlert>Please choose if you have been tested for COVID-19</DivAlert>
              )}

              {covidStatus === 'yes' ? (
                <DivTestDate>
                  <h5>Date of receiving test results</h5>
                  <InputText
                    type='date'
                    placeholder='dd.mm.yy'
                    onChange={handleCovidDate}
                    value={covidDate}
                    className={covidDate ? 'date-input--has-value' : ''}
                    style={{ borderColor: errors.covidDate ? theme.errorColor : theme.borderColor }}
                  />
                  {errors.covidDate && (
                    <DivAlert>Please choose the date you have been tested for COVID-19</DivAlert>
                  )}
                </DivTestDate>
              ) : (
                <div />
              )}
            </DivFormBox>

            <DivBorder />
            <ButtonSubmit>
              Save <FiCheck />
            </ButtonSubmit>

            {createTripError && <ErrorAPI errorText={createTripError} />}
          </form>
        </DivFormWrap>
      </DivNewTrip>

      <MobileTripsSidebar />
    </DivContainer>
  );
};

const DivContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  '@media all and (max-width: 1000px)': {
    flexDirection: 'column',
  },
});

const DivNewTrip = styled.div({
  width: '75%',
  padding: '38px',
  '@media all and (max-width: 1000px)': {
    width: '100%',
  },
  '@media all and (max-width: 800px)': {
    padding: '20px',
  },
  '@media all and (max-width: 750px)': {
    paddingTop: '30px',
  },
});

const DivFormWrap = styled.div({
  maxWidth: '500px',
  margin: 'auto',
  '@media all and (max-width: 750px)': {
    maxWidth: '100%',
  },
});

const H1 = styled.h1({
  borderBottom: `1px solid ${theme.borderColor}`,
  paddingBottom: '24px',
  textAlign: 'left',
});

const DivFormBox = styled.div({
  backgroundColor: theme.primaryGrey,
  padding: '20px',
  textAlign: 'left',
  borderRadius: '10px',
  marginBottom: '25px',
});

const DivSelectWrapper = styled.div({
  borderRadius: '10px',
  backgroundColor: theme.primaryWhite,
  width: '100%',
  height: '48px',
  marginBottom: '20px',
  position: 'relative',
});

const Select = styled.select({
  boxSizing: 'border-box',
  position: 'absolute',
  left: '0',
  top: '0',
  border: `1px solid ${theme.borderColor}`,
  borderRadius: '10px',
  backgroundColor: theme.primaryWhite,
  width: '100%',
  height: '48px',
  padding: '10px 20px',
  fontSize: '14px',
  appearance: 'none',
  color: theme.placeholderColor,
  option: {
    color: theme.primaryBlack,
  },
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  '-o-appearance': 'none',
  background: `url(${chevronUp}) no-repeat`,
  backgroundPosition: '96% 50%',
  '@media all and (max-width: 750px)': {
    backgroundPosition: '94% 50%',
  },
});

const Option = styled.option({
  //color: theme.placeholderColor,
  //backgroundImage: `url(${placeholderFlag})`,
});

const InputText = styled.input({
  border: `1px solid ${theme.borderColor}`,
  borderRadius: '10px',
  backgroundColor: theme.primaryWhite,
  width: '100%',
  padding: '15px 20px',
  marginBottom: '20px',
  fontSize: '14px',
  lineHeight: '19px',
  color: theme.primaryBlack,
  '::placeholder': {
    color: theme.placeholderColor,
    opacity: 1 /* Firefox */,
  },
});

const DivRadio = styled.div({
  display: 'inline-block',
  maxWidth: '80px',
  width: '100%',
  cursor: 'pointer',
  backgroundColor: theme.borderColor,
  padding: '10px',
  borderRadius: '10px',
  margin: '0 10px 20px 0',
  input: {
    cursor: 'pointer',
  },
  label: {
    paddingLeft: '10px',
    cursor: 'pointer',
  },
});

const DivTestDate = styled.div({
  backgroundColor: theme.primaryGrey,
  textAlign: 'left',
  borderTop: `1px solid ${theme.secondaryGrey}`,
  paddingTop: '18px',
});

const ButtonSubmit = styled.button({
  backgroundColor: theme.buttonColor,
  width: '200px',
  borderRadius: '10px',
  border: 'none',
  padding: '15px 20px',
  margin: '20px auto',
  fontSize: '14px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  ':hover': {
    color: theme.secondaryBlack,
    backgroundColor: theme.buttonHoverColor,
    transition: 'all 0.3s ease',
  },
  '@media all and (max-width:500px)': {
    width: '100%',
  },
});

const DivAlert = styled.div({
  color: theme.errorColor,
  fontWeight: 'normal',
  fontSize: '12px',
  marginBottom: '7px',
  position: 'relative',
  top: '-7px',
});

const DivBorder = styled.div({
  height: '30px',
  borderBottom: `1px solid ${theme.borderColor}`,
});
