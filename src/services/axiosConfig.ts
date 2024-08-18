import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // O tu backend falso
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
