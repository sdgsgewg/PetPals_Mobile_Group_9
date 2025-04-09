import axios from "axios";

const api = axios.create({
  // baseURL: "https://localhost:7249/api/v1", // localhost
  // ubah 'baseUrl' sesuai dengan 'applicationUrl' di file 'launchSettings.json' di project backend
  baseURL: "http://192.168.100.8:5249/api/v1", // IP Wi-Fi
  headers: { "Content-Type": "application/json" },
});

export default api;
