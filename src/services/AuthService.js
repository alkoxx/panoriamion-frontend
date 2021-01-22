import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: false,
});

export default {
  async login(loginData) {
    try {
      await apiClient.post("/login", {
        email: loginData.email,
        password: loginData.password,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
