import { ErrorAPI } from '../components/ErrorAPI';
import { FiCheck } from 'react-icons/fi';
import { MobileTripsSidebar } from '../components/MobileTripsSidebar';
import { TripContext } from '../context/TripContext';
import { TripForm } from '../components/TripForm';
import { addTripp } from '../features/trips/tripSlice';
import { authAxios } from '../API-config/configAPI';
import { theme } from '../styles/theme';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import chevronUp from '../images/chevron-up.png';
import styled from 'styled-components';

export const TripEdit = () => {
  return (
    <DivOuterContainer>
      <DivInnerContainer>
        <H1>Edit trip</H1>

        <DivFormContainer>
          <TripForm tripEditing />
          {/* <form onSubmit={handleSubmit}>
            <DivFormBox>
              <h5>Where do you want to go</h5>
              <DivSelectWrapper>
                <Select
                  name='countries'
                  id='country-select'
                  onChange={e => setCountry(e.currentTarget.value)}
                  value={country}
                  style={{
                    borderColor: errors.country ? theme.errorColor : theme.borderColor,
                    color: country ? theme.primaryBlack : theme.placeholderColor,
                  }}
                >
                  <option value=''>Select country</option>
                  {countriesRedux.map((country, index) => (
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
                onChange={e => setStartDate(e.currentTarget.value)}
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
                onChange={e => setEndDate(e.currentTarget.value)}
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
                onChange={e => setCompany(e.currentTarget.value)}
                value={company}
                style={{ borderColor: errors.company ? theme.errorColor : theme.borderColor }}
              />
              {errors.company && <DivAlert>Please type a company</DivAlert>}

              <h5>City</h5>
              <InputText
                type='text'
                placeholder='Type here ...'
                onChange={e => setCity(e.currentTarget.value)}
                value={city}
                style={{ borderColor: errors.city ? theme.errorColor : theme.borderColor }}
              />
              {errors.city && <DivAlert>Please type a city</DivAlert>}

              <h5>Street</h5>
              <InputText
                type='text'
                placeholder='Type here ...'
                onChange={e => setStreet(e.currentTarget.value)}
                value={street}
                style={{ borderColor: errors.street ? theme.errorColor : theme.borderColor }}
              />
              {errors.street && <DivAlert>Please type a street</DivAlert>}

              <h5>Street number</h5>
              <InputText
                type='number'
                placeholder='Type here ...'
                onChange={e => setStreetNumber(e.currentTarget.value)}
                value={streetNumber}
              />

              <h5>Zip code</h5>
              <InputText
                type='number'
                placeholder='Type here ...'
                onChange={e => setZipCode(e.currentTarget.value)}
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
                  onChange={e => setCovidStatus(e.currentTarget.value)}
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
                  onChange={e => setCovidStatus(e.currentTarget.value)}
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
                    onChange={e => setCovidDate(e.currentTarget.value)}
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
          </form> */}
        </DivFormContainer>
      </DivInnerContainer>

      <MobileTripsSidebar />
    </DivOuterContainer>
  );
};

const DivOuterContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  '@media all and (max-width: 1000px)': {
    flexDirection: 'column',
  },
});

const DivInnerContainer = styled.div({
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

const DivFormContainer = styled.div({
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
