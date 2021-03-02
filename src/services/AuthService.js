import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
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
