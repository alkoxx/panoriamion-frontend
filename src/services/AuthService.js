import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

export default {
  async login(loginData) {
    let response = await apiClient.post('/login', {
      email: loginData.email,
      password: loginData.password,
    });
    let userUri = response.headers.location;
    return userUri;
  },

  async checkAuthenticated(userId) {
    await apiClient.get(userId);
  },

  async logout() {
    await apiClient.get('/logout');
  },
};
