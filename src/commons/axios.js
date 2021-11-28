import _axios from 'axios';

// create axios instance
// step2: handle the access
const axios = baseURL => {
  const instance = _axios.create({
    baseURL: baseURL || 'http://localhost:3300',
    timeout: 1000
  });

  // Axios interceptor
  instance.interceptors.request.use((config) => {
    const jwToken = global.auth.getToken()
    config.headers['Authorization'] = 'Bearer ' + jwToken;
    // Do something before request is sent
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

  return instance
}





export { axios }

export default axios();