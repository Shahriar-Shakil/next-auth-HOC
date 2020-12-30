import axios from 'axios';
export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  // baseURL: 'https://aims-dev-api.pondit.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // method: "post",
});
