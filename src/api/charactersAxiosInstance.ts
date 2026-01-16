import axios from "axios";

const charactersAxiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export default charactersAxiosInstance;
