import axios from 'axios';
import { getAuth } from 'firebase/auth';

import Configurations from '@/config/configurations';

const AppAxios = axios.create({
  baseURL: Configurations.BASE_ADDRESS,
  headers: {
    'Content-Type': 'application/json',
  },
});

AppAxios.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

AppAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default AppAxios;
