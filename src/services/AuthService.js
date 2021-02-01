import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

export default {
  async login(loginData) {
    try {
      let response = await apiClient.post("/login", {
        email: loginData.email,
        password: loginData.password,
      });
      let userUri = response.headers.location;
      return userUri;
    } catch (error) {
      console.log(error);
    }
  },
};
