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
      console.log(response.headers);
      let userUri = response.headers.location;
      console.log(userUri);
      return userUri;
    } catch (error) {
      console.log(error);
    }
  },
};
