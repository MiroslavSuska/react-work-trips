import loaderGif from '../images/loader.gif';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <div>
      <img src={loaderGif} alt='Fetching data ...' />
    </div>
  );
};
