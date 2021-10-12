import axios from 'axios';

export const accessToken = 'qM8iSPbNdwny7On98S2f';
export const tripAPI = 'https://task-devel.cleevio-vercel.vercel.app/api/';

export const authAxios = axios.create({
  baseURL: tripAPI,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
