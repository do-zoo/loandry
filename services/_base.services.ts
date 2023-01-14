import axios, { AxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const service = axios.create({
  baseURL,
});

service.interceptors.request.use(
  async config => {
    // getSession can be only used at client side
    // perhaps will returning undefined or null at server side

    // we can assign token from server side using next ctx
    // passed to each service instance
    const user = await getSession();
    if (user?.accessToken) {
      config.headers = {
        Authorization: `Bearer ${user.accessToken}`,
      };
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// service.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (
//       (error.response?.status === 401 || error.response?.status === 403) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       return axios
//         .get('/api/auth/session?refreshToken')
//         .then(() => axios(originalRequest))
//         .catch(_error => {
//           // this happening in the client
//           if (isClient) {
//             signOut();
//             return Promise.reject(_error);
//           }

//           return Promise.reject(_error);
//         });
//     }
//     return Promise.reject(error);
//   }
// );

export const createAuthorizationHeaders = (
  token: unknown
): AxiosRequestConfig => {
  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default service;
