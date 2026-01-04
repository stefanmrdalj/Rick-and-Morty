import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

export default authAxiosInstance;
