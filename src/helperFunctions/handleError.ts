import { AxiosError } from 'axios';
import { flashMessageType } from '../context/TripContext';

export const handleError = (
  err: AxiosError,
  text: string,
  setFlashMessage: React.Dispatch<flashMessageType>
) => {
  if (err.response)
    setFlashMessage({
      display: true,
      type: 'error',
      text: `Error with ${text}. Problem with response -  ${err.message}.`,
    });
  else if (err.request)
    setFlashMessage({
      display: true,
      type: 'error',
      text: `Error with ${text}. Problem with request -  ${err.message}.`,
    });
  else setFlashMessage({ display: true, type: 'error', text: `Error -  ${err.message}.` });
};
